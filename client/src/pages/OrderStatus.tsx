

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
          <div className="brand-lockup"><img src="/northstar-compass-star.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div>
          <div className="header-label"><span className="online-dot" /> Order lookup</div>
        </div>
        <div className="destination-header-nav"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to support desk</button></div>
      </header>
      <div className="order-layout">
        <section className="order-main">
          <div className="order-progress"><span className="progress-active">01 · IDENTIFY</span><i /><span>02 · READ STATUS</span><i /><span>03 · RESOLVE</span></div>
          <div className="order-hero"><span className="eyebrow">ORDER STATUS</span><h1>Track your<br /><em>order</em></h1><p>Enter the order number from your confirmation email, or the email address used at checkout, and we'll show the current status.</p></div>
          <form className="lookup-form" onSubmit={lookup}>
            <label htmlFor="order-query">Order number or checkout email</label>
            <div className="lookup-input"><Search size={19} /><input id="order-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ORD-2026-1002 or you@example.com" autoFocus /><Button type="submit">Track order <ArrowRight size={17} /></Button></div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="lookup-help"><ShieldCheck size={15} /><span>Try <button type="button" onClick={() => setQuery("ORD-2026-1010")}>ORD-2026-1010</button> for a delayed-order example.</span></div>
          </form>
          {response && <section className="lookup-result" aria-live="polite"><div className="result-heading"><div><span className="eyebrow">ORDER FOUND</span><h2>{response.title}</h2></div><div className="result-icon"><CheckCircle2 size={21} /></div></div><p className="result-copy">{response.body}</p>{response.order && <div className="status-record"><div><span>ORDER</span><strong>{response.order.id}</strong></div><div><span>RECIPIENT</span><strong>{response.order.customer}</strong></div><div><span>ITEMS</span><strong>{response.order.items}</strong></div><div><span>STATUS</span><Badge className={`status-badge ${statusClass(response.order.status)}`}>{response.order.statusLabel}</Badge></div><div><span>FULFILLMENT</span><strong>{response.order.fulfillment}</strong></div></div>}{response.actions && <Button className="result-action" variant="outline" onClick={() => navigate("/support-agent")}>{response.actions[0]} <ArrowRight size={16} /></Button>}</section>}
          {!response && <div className="empty-route"><PackageSearch size={22} /><div><strong>Your result will appear here</strong><p>Enter an order number or email above to see the current status.</p></div></div>}
        </section>
        <aside className="order-side"><div className="side-card"><div className="side-star"><Compass size={23} /></div><span className="eyebrow">HOW IT WORKS</span><h3>Fast, clear status.</h3><div className="side-item"><span>01</span><p>Enter your order number or checkout email.</p></div><div className="side-item"><span>02</span><p>We show the current warehouse or carrier status.</p></div><div className="side-item"><span>03</span><p>If you need further help, we connect you with an agent.</p></div></div><div className="side-note"><Mail size={16} /><p>Can't find your order number? Use your checkout email instead.</p></div></aside>
      </div>
    </main>
  );
}
