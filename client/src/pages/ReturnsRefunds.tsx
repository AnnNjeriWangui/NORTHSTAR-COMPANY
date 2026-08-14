

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Compass, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { handleMessage, SupportResponse } from "@/lib/supportEngine";

export default function ReturnsRefunds() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<SupportResponse>();
  const [error, setError] = useState("");

  function lookup(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) { setError("Enter an order number or checkout email to continue."); return; }
    setResponse(handleMessage(query.trim(), "returns_refunds"));
    setError("");
  }

  return (
    <main className="simple-flow-page returns-page">
      <header className="simple-flow-header">
        <div className="destination-header-main">
          <div className="brand-lockup"><img src="/northstar-compass-star.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div>
          <span className="flow-label"><span className="online-dot" /> Returns route</span>
        </div>
        <div className="destination-header-nav"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to support desk</button></div>
      </header>
      <div className="simple-flow-layout"><section className="simple-flow-main"><div className="simple-flow-kicker"><span className="eyebrow">RETURNS / REFUNDS</span><span className="flow-index">01 · FIND ORDER</span></div><h1>Returns &<br /><em>refunds</em></h1><p className="flow-lede">Enter your order number or checkout email. We'll tell you whether a return, refund, or agent review applies to your order.</p><form className="lookup-form" onSubmit={lookup}><label htmlFor="return-query">Order number or checkout email</label><div className="lookup-input"><Search size={19} /><input id="return-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ORD-2026-1004 or you@example.com" /><Button type="submit">Check return <ArrowRight size={17} /></Button></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="lookup-help"><ShieldCheck size={15} /><span>Try <button type="button" onClick={() => setQuery("ORD-2026-1009")}>ORD-2026-1009</button> to see the cancelled-order refund flow.</span></div></form>{response ? <div className="lookup-result"><div className="result-heading"><div><span className="eyebrow">RESULT</span><h2>{response.title}</h2></div><div className="result-icon"><CheckCircle2 size={21} /></div></div><p className="result-copy">{response.body}</p>{response.order && <div className="status-record"><div><span>ORDER</span><strong>{response.order.id}</strong></div><div><span>ITEMS</span><strong>{response.order.items}</strong></div><div><span>ORDER VALUE</span><strong>${response.order.amount.toFixed(2)}</strong></div><div><span>STATUS</span><Badge className="status-badge status-amber">{response.order.statusLabel}</Badge></div></div>}{response.actions && <Button className="result-action" variant="outline" onClick={() => navigate("/support-agent")}>{response.actions[0]} <ArrowRight size={16} /></Button>}</div> : <div className="empty-route"><RotateCcw size={22} /><div><strong>Your return guidance will appear here</strong><p>We check the order status first, so a cancelled order gets the right answer — not the same one as a delivered one.</p></div></div>}</section><aside className="simple-flow-side"><div className="side-card"><div className="side-star"><Compass size={23} /></div><span className="eyebrow">HOW RETURNS WORK</span><h3>Clear answers, not runaround.</h3><div className="side-item"><span>01</span><p>We check if a return applies to your order.</p></div><div className="side-item"><span>02</span><p>We distinguish a return from a refund where relevant.</p></div><div className="side-item"><span>03</span><p>If your case needs an agent, we pass on the context.</p></div></div></aside></div>
    </main>
  );
}
