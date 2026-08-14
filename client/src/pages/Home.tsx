

import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ArrowUpRight, Check, ChevronRight, Compass, Headphones, Package, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { handleMessage, Intent, SupportResponse, welcomeResponse } from "@/lib/supportEngine";
import { findOrders, quickPrompts, Order } from "@/lib/supportData";

const statusTone: Record<string, string> = {
  delivered: "status-green",
  shipped: "status-blue",
  processing: "status-amber",
  cancelled: "status-red",
  delayed: "status-red",
  partly_sent: "status-amber",
  lost: "status-red",
  bad_address: "status-red",
};

function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="order-slip">
      <div className="slip-line"><span>ORDER</span><strong>{order.id}</strong></div>
      <div className="slip-line"><span>RECIPIENT</span><strong>{order.customer}</strong></div>
      <div className="slip-line"><span>CONTENTS</span><strong>{order.items}</strong></div>
      <div className="slip-line"><span>ROUTE STATUS</span><Badge className={`status-badge ${statusTone[order.status]}`}>{order.statusLabel}</Badge></div>
      <div className="slip-line"><span>FULFILLMENT</span><strong>{order.fulfillment}</strong></div>
    </div>
  );
}

function ResponseCard({ response, onAction }: { response: SupportResponse; onAction: (value: string) => void }) {
  return (
    <div className="response-card">
      <div className="response-marker"><Compass size={17} /></div>
      <div className="response-copy">
        <div className="response-kicker">NORTHSTAR ROUTE · {response.intent.replace("_", " ")}</div>
        <h3>{response.title}</h3>
        <p>{response.body}</p>
        {response.order && <OrderSummary order={response.order} />}
        {response.matches && <div className="match-list">{response.matches.map((order) => <button className="match-row" key={order.id} onClick={() => onAction(order.id)}><span><strong>{order.id}</strong><small>{order.items}</small></span><ChevronRight size={16} /></button>)}</div>}
        {response.actions && <div className="response-actions">{response.actions.map((action) => <Button key={action} variant="outline" onClick={() => onAction(action)}>{action}<ArrowUpRight size={15} /></Button>)}</div>}
      </div>
    </div>
  );
}

function Step({ number, label, active, complete }: { number: string; label: string; active?: boolean; complete?: boolean }) {
  return <div className={`route-step ${active ? "active" : ""} ${complete ? "complete" : ""}`}><span>{complete ? <Check size={14} /> : number}</span><small>{label}</small></div>;
}

export default function Home() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<SupportResponse[]>([welcomeResponse()]);
  const [input, setInput] = useState("");
  const [activeIntent, setActiveIntent] = useState<Intent>("unknown");
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
  const last = messages[messages.length - 1];
  const isResolved = Boolean(selectedOrder);
  const orderCount = useMemo(() => findOrders(input).length, [input]);

  function submit(value = input) {
    const clean = value.trim();
    if (!clean) return;
    const response = handleMessage(clean, activeIntent);
    setMessages((current) => [...current, response]);
    if (response.intent !== "unknown") setActiveIntent(response.intent);
    if (response.order) setSelectedOrder(response.order);
    if (response.kind === "disambiguation") setInput("");
    else setInput("");
  }

  function action(value: string) {
    const lower = value.toLowerCase();
    if (lower.includes("order status")) { navigate("/order-status"); return; }
    if (lower.includes("return") || lower.includes("refund")) { navigate("/returns-refunds"); return; }
    if (lower.includes("agent") || lower.includes("support")) { navigate("/support-agent"); return; }
    if (value.startsWith("ORD-")) { const response = handleMessage(value, activeIntent); setMessages((current) => [...current, response]); if (response.order) setSelectedOrder(response.order); }
  }

  return (
    <main className="app-shell">
      <aside className="route-rail">
        <div className="brand-lockup"><img src="/northstar-compass-star.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div>
        <div className="rail-intro"><span className="eyebrow">CUSTOMER SERVICE</span><h1>Customer Support</h1><p>Order status, returns, and refunds — handled quickly.</p></div>
        <div className="route-map">
          <Step number="01" label="Understand" complete={messages.length > 1} />
          <div className="route-line" />
          <Step number="02" label="Identify" active={!isResolved && messages.length > 1} complete={isResolved} />
          <div className="route-line" />
          <Step number="03" label="Resolve" active={isResolved} />
        </div>
        <div className="rail-footer"><span className="online-dot" /> Northstar Retail Co.</div>
      </aside>

      <section className="workspace">
        <header className="topbar"><div><span className="eyebrow">NORTHSTAR RETAIL CO. / CUSTOMER SERVICE</span><h2>Support desk</h2></div><div className="topbar-meta"><span><span className="online-dot" /> Rules engine online</span><Button variant="outline" size="sm" onClick={() => setMessages([welcomeResponse()])}>Reset route</Button></div></header>
        <div className="workspace-grid">
          <section className="conversation-panel">
            <div className="conversation-head"><div><span className="eyebrow">LIVE CONVERSATION</span><h3>How can we help?</h3></div><div className="conversation-count">{messages.length - 1} {messages.length - 1 === 1 ? "reply" : "replies"}</div></div>
            <div className="message-stack" aria-live="polite">
              {messages.map((message, index) => <div key={`${message.kind}-${index}`} className="message-block"><ResponseCard response={message} onAction={action} /></div>)}
            </div>
            <div className="composer-wrap">
              <div className="composer"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submit(); }} placeholder="Ask about an order, return, or refund…" aria-label="Ask Northstar support" /><Button onClick={() => submit()} aria-label="Send question"><Send size={17} /></Button></div>
              {messages.length <= 1 && (
                <div className="quick-row">
                  {quickPrompts.map((prompt) => <button key={prompt} onClick={() => submit(prompt)}>{prompt}</button>)}
                </div>
              )}
              <div className="composer-hint">Try “Where’s my package?” or paste an order number. <span>{orderCount ? `${orderCount} match${orderCount > 1 ? "es" : ""}` : ""}</span></div>
            </div>
          </section>

          <aside className="context-panel">
            <div className="context-visual"><img src="/northstar-hero.jpg" alt="Northstar parcel" /></div>
            <div className="context-body"><span className="eyebrow">WHAT WE HANDLE</span><h3>Order help<br /><em>&amp; returns</em></h3><div className="coverage-item"><span className="coverage-icon"><Package size={17} /></span><div><strong>Order status</strong><p>Processing, shipped, delivered, delayed, split shipments, lost parcels, and address issues.</p></div></div><div className="coverage-item"><span className="coverage-icon"><RotateCcw size={17} /></span><div><strong>Returns &amp; refunds</strong><p>Return eligibility, cancelled-order refunds, and delivery exception support.</p></div></div><div className="coverage-item"><span className="coverage-icon"><Headphones size={17} /></span><div><strong>Agent support</strong><p>For anything that needs a person, we connect you directly with no repeat explanations.</p></div></div></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
