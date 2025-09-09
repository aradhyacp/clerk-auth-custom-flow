import express from "express";
import { Webhook } from "svix";
import config from "../config.js";
import supabase from "../db/index.js";
import { clerkClient } from "@clerk/express";
const router = express.Router();

const WEBHOOK_SECRET = config.WEBHOOK_SECRET;
const WEBHOOK_SECRET_ROLE = config.WEBHOOK_SECRET_ROLE;
router.post("/create", async (req, res) => {
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
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: { role: "user" },
      });

      console.log("user added to supabase and role set");
    } catch (error) {
      console.error("Error creating user in database:", error);
      return res.status(500).json({ message: "Error creating user" });
    }
  }
  return res.status(200).json({ message: "Webhook received successfully" });
});

router.post("/roleUpdate",async (req,res)=>{
    if (!WEBHOOK_SECRET_ROLE) {
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

  const wh = new Webhook(WEBHOOK_SECRET_ROLE);

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


  if (event.type === "user.updated"){
    try {
      const newRole = event.data.public_metadata?.role;
      console.log(newRole);
      if (!newRole) {
    console.error("No role found found");
        return res.status(400).json({ message: "No role found" });
  }
  const { error: updateError } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", id);
  if (updateError) {
        console.log(updateError);
        return res.status(500).json({ error: "Failed to update role to supabase" });
      }
    } catch (error) {
      console.error("Error creating user in database:", error);
      return res.status(500).json({ message: "Error creating user" });
    }
  }
  return res.status(200).json({ message: "Webhook received successfully" });
})
export default router;
