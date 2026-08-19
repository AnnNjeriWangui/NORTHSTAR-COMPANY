/* Parcel Atlas reminder: keep data presentation editorial, precise, and visibly connected to the Northstar support flow. */

import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

// Safaricom Daraja STK Callback Interfaces
export interface MpesaCallbackItem {
  Name: string;
  Value?: string | number;
}

export interface MpesaCallbackMetadata {
  Item: MpesaCallbackItem[];
}

export interface StkCallbackBody {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: MpesaCallbackMetadata;
}

export interface StkCallbackPayload {
  Body: {
    stkCallback: StkCallbackBody;
  };
}

export interface ParsedMpesaTransaction {
  merchantRequestId: string;
  checkoutRequestId: string;
  resultCode: number;
  resultDesc: string;
  success: boolean;
  amount?: number;
  mpesaReceiptNumber?: string;
  transactionDate?: string;
  phoneNumber?: string;
}

// In-memory cache to prevent duplicate processing of callbacks (Idempotency)
const processedTransactions = new Set<string>();

/**
 * Safaricom Daraja Webhook Verification Middleware
 * Validates security token header against MPESA_CALLBACK_TOKEN environment variable.
 */
export function verifyMpesaCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenHeader = (req.headers["x-mpesa-token"] ||
    req.headers["authorization"]) as string | undefined;

  const expectedToken =
    process.env.MPESA_CALLBACK_TOKEN || "northstar-mpesa-secure-token-2026";

  if (!tokenHeader) {
    console.warn("[M-Pesa Webhook Warning] Missing security token in callback headers");
    return res.status(401).json({
      ResultCode: 1,
      ResultDesc: "Unauthorized: Missing security token",
    });
  }

  // Normalize Bearer token if present
  const token = tokenHeader.startsWith("Bearer ")
    ? tokenHeader.substring(7)
    : tokenHeader;

  // Use timing-safe comparison to protect against timing attacks
  const tokenBuf = Buffer.from(token);
  const expectedBuf = Buffer.from(expectedToken);

  if (
    tokenBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(tokenBuf, expectedBuf)
  ) {
    console.warn("[M-Pesa Webhook Warning] Invalid security token received");
    return res.status(403).json({
      ResultCode: 1,
      ResultDesc: "Forbidden: Invalid security token",
    });
  }

  next();
}

/**
 * Helper function to extract typed value from CallbackMetadata Item array
 */
export function getMetadataValue<T = string | number>(
  items: MpesaCallbackItem[] | undefined,
  name: string
): T | undefined {
  if (!items) return undefined;
  const found = items.find((item) => item.Name === name);
  return found ? (found.Value as T) : undefined;
}

/**
 * Parses raw Safaricom STK Push callback payload into a structured result
 */
export function parseMpesaCallback(payload: StkCallbackPayload): ParsedMpesaTransaction {
  const callback = payload?.Body?.stkCallback;

  if (!callback) {
    throw new Error("Invalid payload: Missing Body.stkCallback");
  }

  const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
    callback;

  const items = CallbackMetadata?.Item;
  const isSuccess = ResultCode === 0;

  return {
    merchantRequestId: MerchantRequestID,
    checkoutRequestId: CheckoutRequestID,
    resultCode: ResultCode,
    resultDesc: ResultDesc,
    success: isSuccess,
    amount: isSuccess ? getMetadataValue<number>(items, "Amount") : undefined,
    mpesaReceiptNumber: isSuccess
      ? getMetadataValue<string>(items, "MpesaReceiptNumber")
      : undefined,
    transactionDate: isSuccess
      ? String(getMetadataValue<string | number>(items, "TransactionDate") || "")
      : undefined,
    phoneNumber: isSuccess
      ? String(getMetadataValue<string | number>(items, "PhoneNumber") || "")
      : undefined,
  };
}

/**
 * Express route handler for Safaricom STK Push callback
 */
export function handleMpesaStkCallback(req: Request, res: Response) {
  try {
    const parsed = parseMpesaCallback(req.body as StkCallbackPayload);

    // Idempotency check using CheckoutRequestID or MpesaReceiptNumber
    const trackingKey = parsed.mpesaReceiptNumber || parsed.checkoutRequestId;

    if (processedTransactions.has(trackingKey)) {
      console.log(`[M-Pesa Webhook] Duplicate callback ignored for: ${trackingKey}`);
      return res.status(200).json({
        ResultCode: 0,
        ResultDesc: "Callback already processed",
      });
    }

    processedTransactions.add(trackingKey);

    if (parsed.success) {
      console.log(
        `[M-Pesa Success] Receipt: ${parsed.mpesaReceiptNumber}, Amount: KES ${parsed.amount}, Phone: ${parsed.phoneNumber}`
      );
      // Here: Update Northstar database / order system status for the matching order
    } else {
      console.warn(
        `[M-Pesa Failed/Cancelled] CheckoutID: ${parsed.checkoutRequestId}, Code: ${parsed.resultCode}, Desc: ${parsed.resultDesc}`
      );
    }

    // Safaricom Daraja expects HTTP 200 with standard ResultCode 0 response
    return res.status(200).json({
      ResultCode: 0,
      ResultDesc: "Callback processed successfully",
    });
  } catch (error: any) {
    console.error(`[M-Pesa Webhook Error] ${error.message}`);
    return res.status(400).json({
      ResultCode: 1,
      ResultDesc: `Bad Request: ${error.message}`,
    });
  }
}

/**
 * Resets the transaction idempotency set (useful for unit testing)
 */
export function clearProcessedTransactions() {
  processedTransactions.clear();
}
