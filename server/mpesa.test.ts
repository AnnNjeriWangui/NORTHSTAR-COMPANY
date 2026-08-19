import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  verifyMpesaCallback,
  parseMpesaCallback,
  handleMpesaStkCallback,
  clearProcessedTransactions,
  StkCallbackPayload,
} from "./mpesa";

describe("Safaricom M-Pesa Callback Verification & Handler", () => {
  beforeEach(() => {
    clearProcessedTransactions();
    vi.restoreAllMocks();
  });

  describe("verifyMpesaCallback Middleware", () => {
    it("should return 401 if security token header is missing", () => {
      const req: any = { headers: {} };
      const res: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      verifyMpesaCallback(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        ResultCode: 1,
        ResultDesc: "Unauthorized: Missing security token",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if security token header is invalid", () => {
      const req: any = { headers: { "x-mpesa-token": "wrong-token" } };
      const res: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      verifyMpesaCallback(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        ResultCode: 1,
        ResultDesc: "Forbidden: Invalid security token",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next() if valid token is provided in x-mpesa-token header", () => {
      const req: any = {
        headers: { "x-mpesa-token": "northstar-mpesa-secure-token-2026" },
      };
      const res: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      verifyMpesaCallback(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should call next() if valid Bearer token is provided in authorization header", () => {
      const req: any = {
        headers: {
          authorization: "Bearer northstar-mpesa-secure-token-2026",
        },
      };
      const res: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      verifyMpesaCallback(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("parseMpesaCallback", () => {
    it("should correctly parse successful STK push callback metadata", () => {
      const payload: StkCallbackPayload = {
        Body: {
          stkCallback: {
            MerchantRequestID: "29115-3462056-1",
            CheckoutRequestID: "ws_CO_191220191020000001",
            ResultCode: 0,
            ResultDesc: "The service request is processed successfully.",
            CallbackMetadata: {
              Item: [
                { Name: "Amount", Value: 1500.5 },
                { Name: "MpesaReceiptNumber", Value: "QGH7RT61SV" },
                { Name: "TransactionDate", Value: 20260819132000 },
                { Name: "PhoneNumber", Value: 254712345678 },
              ],
            },
          },
        },
      };

      const result = parseMpesaCallback(payload);

      expect(result.success).toBe(true);
      expect(result.merchantRequestId).toBe("29115-3462056-1");
      expect(result.checkoutRequestId).toBe("ws_CO_191220191020000001");
      expect(result.resultCode).toBe(0);
      expect(result.amount).toBe(1500.5);
      expect(result.mpesaReceiptNumber).toBe("QGH7RT61SV");
      expect(result.phoneNumber).toBe("254712345678");
    });

    it("should correctly parse cancelled or failed STK push callback", () => {
      const payload: StkCallbackPayload = {
        Body: {
          stkCallback: {
            MerchantRequestID: "29115-3462056-1",
            CheckoutRequestID: "ws_CO_191220191020000002",
            ResultCode: 1032,
            ResultDesc: "Request cancelled by user.",
          },
        },
      };

      const result = parseMpesaCallback(payload);

      expect(result.success).toBe(false);
      expect(result.resultCode).toBe(1032);
      expect(result.resultDesc).toBe("Request cancelled by user.");
      expect(result.mpesaReceiptNumber).toBeUndefined();
      expect(result.amount).toBeUndefined();
    });

    it("should throw an error for malformed payload", () => {
      expect(() => parseMpesaCallback({} as any)).toThrow("Invalid payload");
    });
  });

  describe("handleMpesaStkCallback Route Handler", () => {
    it("should process callback and respond with HTTP 200 and ResultCode 0", () => {
      const req: any = {
        body: {
          Body: {
            stkCallback: {
              MerchantRequestID: "29115-3462056-1",
              CheckoutRequestID: "ws_CO_191220191020000003",
              ResultCode: 0,
              ResultDesc: "Success",
              CallbackMetadata: {
                Item: [
                  { Name: "Amount", Value: 500 },
                  { Name: "MpesaReceiptNumber", Value: "REC1234567" },
                ],
              },
            },
          },
        },
      };

      const res: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      handleMpesaStkCallback(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ResultCode: 0,
        ResultDesc: "Callback processed successfully",
      });
    });

    it("should return duplicate ignored status on repeated callbacks (Idempotency)", () => {
      const req: any = {
        body: {
          Body: {
            stkCallback: {
              MerchantRequestID: "29115-3462056-1",
              CheckoutRequestID: "ws_CO_191220191020000004",
              ResultCode: 0,
              ResultDesc: "Success",
              CallbackMetadata: {
                Item: [{ Name: "MpesaReceiptNumber", Value: "DUPLICATE123" }],
              },
            },
          },
        },
      };

      const res1: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const res2: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      handleMpesaStkCallback(req, res1);
      handleMpesaStkCallback(req, res2);

      expect(res2.status).toHaveBeenCalledWith(200);
      expect(res2.json).toHaveBeenCalledWith({
        ResultCode: 0,
        ResultDesc: "Callback already processed",
      });
    });
  });
});
