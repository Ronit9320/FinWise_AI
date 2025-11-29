import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// In-memory store (use DB in production)
const subscribers = [];

// API: subscribe to monthly reminders
app.post("/api/reminders/subscribe", (req, res) => {
  const { name, email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const exists = subscribers.find((s) => s.email === email);
  if (!exists) {
    subscribers.push({ name, email });
  }

  return res.json({ message: "Subscribed" });
});

// SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Cron job: run every day at 09:00 IST, send reminders if day is 1
cron.schedule("0 9 * * *", async () => {
  const today = new Date();
  const day = today.getDate();

  if (day !== 1) return;

  console.log("Running monthly reminder job... Subscribers:", subscribers.length);

  for (const user of subscribers) {
    try {
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "RetireWise – Monthly retirement check-in",
        text: `Hi ${user.name || "there"},

It's the 1st of the month – time to review your retirement plan.

Quick checklist:
1. Did you invest your planned monthly amount?
2. Are your SIPs/NPS/EPF contributions going as expected?
3. Any big expenses coming up (education, travel, medical)?
4. Do you need to adjust your savings or risk level?

Log in to your RetireWise AI chatbot and run Advanced mode for a fresh estimate.

– RetireWise AI`,
      });

      console.log(`Reminder sent to ${user.email}: ${info.messageId}`);
    } catch (err) {
      console.error("Error sending to", user.email, err);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Reminder server listening on http://localhost:${PORT}`);
});
