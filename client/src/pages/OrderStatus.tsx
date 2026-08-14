/* Parcel Atlas reminder: this page is a calm wayfinding step—warm paper, ink navy, Northstar red signal, and no silent guesses. */

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Compass, Mail, PackageSearch, Search, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { handleMessage, SupportResponse } from "@/lib/supportEngine";

function statusClass(status?: string) {
  if (status === "delivered") return "status-green";
  if (status === "shipped") return "status-blue";
  if (status === "processing") return "status-amber";
  return "status-red";
}

export default function OrderStatus() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<SupportResponse>();
  const [error, setError] = useState("");

  function lookup(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) { setError("Enter an order number or checkout email to continue."); return; }
    const result = handleMessage(value, "order_status");
    setResponse(result);
    setError("");
  }

  return (
    <main className="order-page">
      <header className="order-header">
        <div className="destination-header-main">
          <div className="brand-lockup"><img src="/manus-storage/northstar-compass-star_0bb6b2a1.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div>
          <div className="header-label"><span className="online-dot" /> Secure prototype lookup</div>
        </div>
        <div className="destination-header-nav"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to support desk</button></div>
      </header>
      <div className="order-layout">
        <section className="order-main">
          <div className="order-progress"><span className="progress-active">01 · IDENTIFY</span><i /><span>02 · READ STATUS</span><i /><span>03 · RESOLVE</span></div>
          <div className="order-hero"><span className="eyebrow">ORDER STATUS / SELF-SERVE</span><h1>Let’s find the<br /><em>signal in your order.</em></h1><p>Use the order number from your confirmation email or the email address used at checkout. We’ll show the latest warehouse or carrier state available in the Northstar prototype dataset.</p></div>
          <form className="lookup-form" onSubmit={lookup}>
            <label htmlFor="order-query">Order number or checkout email</label>
            <div className="lookup-input"><Search size={19} /><input id="order-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ORD-2026-1002 or you@example.com" autoFocus /><Button type="submit">Track order <ArrowRight size={17} /></Button></div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="lookup-help"><ShieldCheck size={15} /><span>Your details stay within this fictional prototype. Try <button type="button" onClick={() => setQuery("ORD-2026-1010")}>ORD-2026-1010</button> for a delayed-order example.</span></div>
          </form>
          {response && <section className="lookup-result" aria-live="polite"><div className="result-heading"><div><span className="eyebrow">ROUTE FOUND</span><h2>{response.title}</h2></div><div className="result-icon"><CheckCircle2 size={21} /></div></div><p className="result-copy">{response.body}</p>{response.order && <div className="status-record"><div><span>ORDER</span><strong>{response.order.id}</strong></div><div><span>RECIPIENT</span><strong>{response.order.customer}</strong></div><div><span>ITEMS</span><strong>{response.order.items}</strong></div><div><span>STATUS</span><Badge className={`status-badge ${statusClass(response.order.status)}`}>{response.order.statusLabel}</Badge></div><div><span>FULFILLMENT</span><strong>{response.order.fulfillment}</strong></div></div>}{response.actions && <Button className="result-action" variant="outline" onClick={() => navigate("/support-agent")}>{response.actions[0]} <ArrowRight size={16} /></Button>}</section>}
          {!response && <div className="empty-route"><PackageSearch size={22} /><div><strong>Your route will appear here</strong><p>Enter an order number or email above to see processing, shipping, delivery, or exception details.</p></div></div>}
        </section>
        <aside className="order-side"><div className="side-card"><div className="side-star"><Compass size={23} /></div><span className="eyebrow">WHAT YOU CAN EXPECT</span><h3>A useful answer, not a dead end.</h3><div className="side-item"><span>01</span><p>We identify the order from the committed mock dataset.</p></div><div className="side-item"><span>02</span><p>We explain the current state in plain language.</p></div><div className="side-item"><span>03</span><p>If the route needs a person, we say so clearly.</p></div></div><div className="side-note"><Mail size={16} /><p>Can’t find the number? Use the checkout email instead.</p></div></aside>
      </div>
    </main>
  );
}
