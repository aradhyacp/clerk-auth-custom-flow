import config from "./config.js";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import webhookRouter from "./router/webhook.js";
import adminRouter from "./router/admin.js"
import userRouter from "./router/user.js"

//the verdict

const app = express();
const port = config.PORT || 1337;


app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());


app.use('/api/webhook', webhookRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)


app.get("/", (req, res) => {
  res.json({
    message: "working perfectly",
  });
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
