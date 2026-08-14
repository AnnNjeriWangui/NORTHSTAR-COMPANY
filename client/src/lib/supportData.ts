/* Parcel Atlas reminder: keep data presentation editorial, precise, and visibly connected to the Northstar support flow. */

export type OrderStatus =
  | "delivered"
  | "shipped"
  | "processing"
  | "cancelled"
  | "delayed"
  | "partly_sent"
  | "lost"
  | "bad_address";

export type Order = {
  id: string;
  customer: string;
  email: string;
  items: string;
  amount: number;
  orderDate: string;
  status: OrderStatus;
  statusLabel: string;
  fulfillment: string;
  scenario: string;
};

export const orders: Order[] = [
  { id: "ORD-2026-1001", customer: "Ava Thompson", email: "ava.thompson@example.com", items: "Stainless steel water bottle ×1", amount: 24.99, orderDate: "2026-07-28", status: "delivered", statusLabel: "Delivered Aug 1", fulfillment: "USPS 9400 1000 0000 0000 0001", scenario: "Routine order-status inquiry" },
  { id: "ORD-2026-1002", customer: "Liam Patel", email: "liam.patel@example.com", items: "Wireless mouse ×1, USB-C cable ×2", amount: 63.5, orderDate: "2026-08-02", status: "shipped", statusLabel: "Shipped", fulfillment: "FedEx 7840 1000 0000 0002", scenario: "Tracking availability check" },
  { id: "ORD-2026-1003", customer: "Maya Chen", email: "maya.chen@example.com", items: "Ceramic mug set ×1", amount: 39, orderDate: "2026-08-09", status: "processing", statusLabel: "Processing", fulfillment: "Not yet assigned", scenario: "Pre-shipment question" },
  { id: "ORD-2026-1004", customer: "Noah García", email: "noah.garcia@example.com", items: "LED desk lamp ×1", amount: 54.25, orderDate: "2026-07-25", status: "delivered", statusLabel: "Delivered Jul 30", fulfillment: "UPS 1Z1000000000000004", scenario: "Return policy question" },
  { id: "ORD-2026-1005", customer: "Sofia Rossi", email: "sofia.rossi@example.com", items: "Yoga mat ×1, yoga strap ×1", amount: 48.75, orderDate: "2026-08-05", status: "shipped", statusLabel: "Shipped", fulfillment: "USPS 9400 1000 0000 0000 0005", scenario: "Delivery estimate question" },
  { id: "ORD-2026-1006", customer: "Ethan Kim", email: "ethan.kim@example.com", items: "Bluetooth speaker ×1", amount: 89.99, orderDate: "2026-08-11", status: "processing", statusLabel: "Processing", fulfillment: "Not yet assigned", scenario: "Order edit or payment question" },
  { id: "ORD-2026-1007", customer: "Isabella Nguyen", email: "isabella.nguyen@example.com", items: "Phone case ×2", amount: 35.98, orderDate: "2026-07-30", status: "delivered", statusLabel: "Delivered Aug 4", fulfillment: "DHL 1000000007", scenario: "Product support question" },
  { id: "ORD-2026-1008", customer: "Lucas Meyer", email: "lucas.meyer@example.com", items: "Coffee beans 1 kg ×2", amount: 31.8, orderDate: "2026-08-07", status: "shipped", statusLabel: "Shipped", fulfillment: "FedEx 7840 1000 0000 0008", scenario: "Delivery instructions question" },
  { id: "ORD-2026-1009", customer: "Oliver Brown", email: "oliver.brown@example.com", items: "Standing desk converter ×1", amount: 129, orderDate: "2026-08-03", status: "cancelled", statusLabel: "Cancelled", fulfillment: "Refund pending since Aug 4", scenario: "Cancellation and refund confirmation" },
  { id: "ORD-2026-1010", customer: "Amelia Johnson", email: "amelia.johnson@example.com", items: "Hiking boots ×1", amount: 112.4, orderDate: "2026-07-29", status: "delayed", statusLabel: "Delayed", fulfillment: "Weather delay · revised ETA Aug 18", scenario: "Delay notification and empathy" },
  { id: "ORD-2026-1011", customer: "Elijah Smith", email: "elijah.smith@example.com", items: "Espresso machine ×1, grinder ×1, tamper ×1", amount: 245, orderDate: "2026-08-01", status: "partly_sent", statusLabel: "Partly shipped", fulfillment: "Machine + tamper shipped · grinder backordered until Aug 20", scenario: "Split shipment communication" },
  { id: "ORD-2026-1012", customer: "Harper Davis", email: "harper.davis@example.com", items: "Noise-cancelling headphones ×1", amount: 179.99, orderDate: "2026-07-26", status: "lost", statusLabel: "Carrier investigation", fulfillment: "Tracking stalled at regional facility · claim opened", scenario: "Lost-package investigation and resolution" },
  { id: "ORD-2026-1013", customer: "Kai Wilson", email: "kai.wilson@example.com", items: "Smart thermostat ×1", amount: 139.5, orderDate: "2026-08-04", status: "bad_address", statusLabel: "Address issue", fulfillment: "Held at depot · missing unit number and ZIP mismatch", scenario: "Address correction and reshipment" },
];

export function normalizeLookup(value: string): string {
  return value.trim().toLowerCase().replace(/^#/, "");
}

export function findOrders(value: string): Order[] {
  const query = normalizeLookup(value);
  if (!query) return [];
  return orders.filter((order) => normalizeLookup(order.id) === query || order.id.replace("ORD-2026-", "") === query || order.email.toLowerCase() === query);
}

export const quickPrompts = [
  "Where is my order?",
  "I want to return my order",
  "When will I get my refund?",
  "Talk to an agent",
];
