import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Webhook } from "svix";
import { clerkMiddleware } from "@clerk/express";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
const port = process.env.PORT || 1337;
const WEBHOOK_SECRET = process.env.WEBHOOK_SIGNING_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/", (req, res) => {
  res.json({
    message: "working perfectly",
  });
});

app.post("/api/webhook/create", async (req, res) => {
  if (!WEBHOOK_SECRET) {
    return res.json({
      message: "No sign key found",
    });
  }

  const svix_id = req.get("svix-id");
  const svix_timestamp = req.get("svix-timestamp");
  const svix_signature = req.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      message: "error no svix input",
    });
  }

  const payload = req.body;
  const payload_string = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let event;

  try {
    event = wh.verify(payload_string, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    console.log(event);
  } catch (error) {
    console.log("error in verifying webhook", error);
    return res.status(400).json({
      message: "error in verifying webhook",
    });
  }

  const { id } = event.data;
  const eventType = event.type;
  console.log("logging the id and type of event");
  console.log(id, eventType);

  if (eventType === "user.created") {
    try {
      const { email_addresses, primary_email_address_id } = event.data;
      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );
      console.log("Primary email:", primaryEmail);
      console.log("Email addresses:", primaryEmail?.email_address);

      if (!primaryEmail) {
        console.error("No primary email found");
        return res.status(400).json({ message: "No primary email found" });
      }

      const { error: insertError } = await supabase.from("users").insert([
        {
          id: id,
          email: primaryEmail.email_address,
        },
      ]);
      if (insertError) {
        console.log(insertError);
        return res.status(500).json({ error: "Failed to add to supabase" });
      }

      console.log("user added to supabase");
    } catch (error) {
      console.error("Error creating user in database:", error);
      return res.status(500).json({ message: "Error creating user" });
    }
  }
  return res.status(200).json({ message: "Webhook received successfully" });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    message: "healthy",
  });
});
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(400).json({
    message: "internal server error",
    error: err,
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
