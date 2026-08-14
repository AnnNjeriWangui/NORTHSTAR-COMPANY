import { describe, expect, it } from "vitest";
import { classifyIntent, handleMessage } from "./supportEngine";

describe("Northstar support flow", () => {
  it("classifies natural order-status language", () => {
    expect(classifyIntent("where's my package?")).toBe("order_status");
    expect(classifyIntent("Has my order shipped?")).toBe("order_status");
    expect(classifyIntent("my order hasn't arrived")).toBe("order_status");
  });

  it("classifies returns and refund language", () => {
    expect(classifyIntent("Can I send this back?")).toBe("returns_refunds");
    expect(classifyIntent("When will I get my money back?")).toBe("returns_refunds");
  });

  it("returns a specific response for a normal order", () => {
    const response = handleMessage("ORD-2026-1002");
    expect(response.kind).toBe("order");
    expect(response.order?.status).toBe("shipped");
    expect(response.title).toContain("way");
  });

  it("handles the documented exception states", () => {
    expect(handleMessage("1010").order?.status).toBe("delayed");
    expect(handleMessage("1011").order?.status).toBe("partly_sent");
    expect(handleMessage("1012").order?.status).toBe("lost");
    expect(handleMessage("1013").order?.status).toBe("bad_address");
    expect(handleMessage("1009").order?.status).toBe("cancelled");
  });

  it("uses the email lookup path", () => {
    const response = handleMessage("maya.chen@example.com");
    expect(response.order?.id).toBe("ORD-2026-1003");
  });

  it("routes returns and refunds through the matched order", () => {
    const response = handleMessage("ORD-2026-1009", "returns_refunds");
    expect(response.kind).toBe("return");
    expect(response.title).toContain("refund");
  });

  it("does not guess on vague input", () => {
    const response = handleMessage("I need help");
    expect(response.kind).toBe("fallback");
    expect(response.body).toContain("order");
  });

  it("offers a human handoff when explicitly requested", () => {
    const response = handleMessage("Please connect me to a human");
    expect(response.kind).toBe("agent");
  });

  it("handles an unknown order safely", () => {
    const response = handleMessage("ORD-2026-9999");
    expect(response.needsLookup).toBe(true);
    expect(response.body).toContain("couldn’t find");
  });
});
