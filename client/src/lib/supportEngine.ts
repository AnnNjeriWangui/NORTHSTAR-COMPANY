/* Parcel Atlas reminder: make routing visible, forgiving, and honest; never guess silently. */

import { findOrders, Order } from "./supportData";

export type Intent = "order_status" | "returns_refunds" | "agent" | "unknown";
export type ResponseKind = "welcome" | "prompt_lookup" | "order" | "return" | "agent" | "fallback" | "disambiguation";

export type SupportResponse = {
  kind: ResponseKind;
  intent: Intent;
  title: string;
  body: string;
  order?: Order;
  matches?: Order[];
  actions?: string[];
  needsLookup?: boolean;
};

const orderTerms = ["order", "package", "parcel", "shipped", "shipping", "arrive", "delivery", "delivered", "tracking", "where is", "hasn't arrived", "late", "delayed"];
const returnTerms = ["return", "send this back", "send it back", "refund", "money back", "exchange", "returning"];
const agentTerms = ["agent", "human", "representative", "person", "support team", "customer service"];

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

export function classifyIntent(input: string): Intent {
  const text = input.trim().toLowerCase();
  if (!text) return "unknown";
  if (includesAny(text, agentTerms)) return "agent";
  const orderScore = orderTerms.filter((term) => text.includes(term)).length;
  const returnScore = returnTerms.filter((term) => text.includes(term)).length;
  if (returnScore > 0 && returnScore >= orderScore) return "returns_refunds";
  if (orderScore > 0) return "order_status";
  return "unknown";
}

export function welcomeResponse(): SupportResponse {
  return {
    kind: "welcome",
    intent: "unknown",
    title: "Find the right route",
    body: "I can help with order status, returns and refunds, or connect you with a support representative.",
    actions: ["Check order status", "Returns & refunds", "Talk to an agent"],
  };
}

export function lookupPrompt(intent: Intent): SupportResponse {
  const topic = intent === "returns_refunds" ? "return or refund" : "order status";
  return {
    kind: "prompt_lookup",
    intent,
    title: `Let’s find your ${topic}`,
    body: "Enter your order number, such as ORD-2026-1002 or 1002, or the email address used at checkout.",
    needsLookup: true,
  };
}

export function responseForOrder(order: Order, intent: Intent): SupportResponse {
  if (intent === "returns_refunds") return responseForReturn(order);
  const common = `Order ${order.id} · ${order.items}`;
  switch (order.status) {
    case "processing":
      return { kind: "order", intent, order, title: "Your order is being prepared", body: `${common}. Our warehouse is picking and packing it now. You’ll receive a tracking link as soon as it leaves the facility. Standard processing is typically 1–2 business days.` };
    case "shipped":
      return { kind: "order", intent, order, title: "Your package is on its way", body: `${common}. Carrier: ${order.fulfillment}. Tracking can take 24–48 hours to show its first scan after the shipping email.` };
    case "delivered":
      return { kind: "order", intent, order, title: "Your order was delivered", body: `${common}. ${order.statusLabel}. If you cannot find it, check nearby entrances and with household members first, then contact support for a delivery investigation.` };
    case "cancelled":
      return { kind: "order", intent, order, title: "This order was cancelled", body: `${common}. It will not ship. ${order.fulfillment}. If the refund has not appeared after the stated bank-processing window, a representative can review it.` };
    case "delayed":
      return { kind: "order", intent, order, title: "Your delivery is delayed", body: `${common}. The carrier reported a weather delay. The revised delivery estimate is August 18. We’re sorry the original ETA was missed; support can open an urgent carrier trace if needed.` };
    case "partly_sent":
      return { kind: "order", intent, order, title: "Your order is arriving in two parts", body: `${common}. Machine and tamper have shipped. The grinder is backordered until August 20, so the remaining item will follow separately without an extra charge.` };
    case "lost":
      return { kind: "order", intent, order, title: "A carrier investigation is open", body: `${common}. ${order.fulfillment}. Because the tracking has stalled, this needs a priority review for replacement or refund. I can connect you with support now.` , actions: ["Connect me with support"] };
    case "bad_address":
      return { kind: "order", intent, order, title: "The carrier needs an address correction", body: `${common}. ${order.fulfillment}. The package is being held at the depot. Please confirm the missing unit number and ZIP code with support before reshipment.` , actions: ["Connect me with support"] };
  }
}

export function responseForReturn(order: Order): SupportResponse {
  if (order.status === "cancelled") {
    return { kind: "return", intent: "returns_refunds", order, title: "Your refund is pending", body: `Order ${order.id} was cancelled before shipment. ${order.fulfillment}. No return is needed. If the refund does not arrive within the expected bank-processing window, support can review the payment record.` };
  }
  if (order.status === "lost" || order.status === "bad_address") {
    return { kind: "return", intent: "returns_refunds", order, title: "Let’s resolve the delivery issue first", body: `Order ${order.id} has an active shipping exception. A return cannot be started until support confirms whether a replacement or refund is the right resolution.`, actions: ["Connect me with support"] };
  }
  return { kind: "return", intent: "returns_refunds", order, title: "Your return route is available", body: `Order ${order.id} is eligible for a standard return review. Tell us the reason for the return and keep the item in its original condition where possible. A support representative will confirm the label and next step.` };
}

export function agentResponse(): SupportResponse {
  return { kind: "agent", intent: "agent", title: "A support representative can take over", body: "I’ll keep the details you entered with the conversation so the team can pick up without making you repeat the story.", actions: ["Support request ready"] };
}

export function fallbackResponse(): SupportResponse {
  return { kind: "fallback", intent: "unknown", title: "I want to route this correctly", body: "I’m not sure I understood that. Are you asking about an order, a return or refund, or would you like a support representative?", actions: ["Check order status", "Returns & refunds", "Talk to an agent"] };
}

export function handleMessage(input: string, activeIntent?: Intent): SupportResponse {
  const directLookup = findOrders(input);
  const looksLikeLookup = Boolean(input.trim().match(/(?:ORD-2026-)?\d{4}/i) || input.includes("@"));
  const inferredIntent = looksLikeLookup ? "order_status" : classifyIntent(input);
  const intent = activeIntent && activeIntent !== "unknown" ? activeIntent : inferredIntent;
  if (intent === "agent") return agentResponse();
  if (intent === "unknown") return fallbackResponse();
  const matches = directLookup;
  if (matches.length === 1) return responseForOrder(matches[0], intent);
  if (matches.length > 1) return { kind: "disambiguation", intent, title: "I found more than one order", body: "Choose the order you mean so I can give you the right answer.", matches };
  if (input.match(/(?:ORD-2026-)?\d{4}/i) || input.includes("@")) return { kind: "fallback", intent, title: "I couldn’t find that order", body: "I couldn’t find an order matching that information. Please check the order number or checkout email for typos and try again. You can also ask a representative for help.", needsLookup: true };
  return lookupPrompt(intent);
}
