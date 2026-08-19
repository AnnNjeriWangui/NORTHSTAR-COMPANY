/* Parcel Atlas reminder: keep data presentation editorial, precise, and visibly connected to the Northstar support flow. */

import express from "express";
import { verifyMpesaCallback, handleMpesaStkCallback } from "../server/mpesa";

const app = express();

app.use(express.json());

// Safaricom M-Pesa STK Push webhook callback endpoint
app.post(
  "/api/webhooks/mpesa/stk-callback",
  verifyMpesaCallback,
  handleMpesaStkCallback
);

// Fallback for unknown API routes
app.all("/api/*", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
