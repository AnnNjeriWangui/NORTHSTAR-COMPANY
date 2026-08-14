/* Parcel Atlas reminder: returns should feel clear and fair—plain language, calm escalation, and visible next steps. */

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
      <header className="simple-flow-header"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to support desk</button><div className="brand-lockup"><img src="/manus-storage/northstar-compass-star_0bb6b2a1.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div><span className="flow-label"><span className="online-dot" /> Returns route</span></header>
      <div className="simple-flow-layout"><section className="simple-flow-main"><div className="simple-flow-kicker"><span className="eyebrow">RETURNS / REFUNDS / SELF-SERVE</span><span className="flow-index">01 · FIND ORDER</span></div><h1>Let’s make the<br /><em>next step fair.</em></h1><p className="flow-lede">Start with your order number or checkout email. We’ll explain whether a standard return review, refund check, or human resolution is the right route.</p><form className="lookup-form" onSubmit={lookup}><label htmlFor="return-query">Order number or checkout email</label><div className="lookup-input"><Search size={19} /><input id="return-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ORD-2026-1004 or you@example.com" /><Button type="submit">Review return <ArrowRight size={17} /></Button></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="lookup-help"><ShieldCheck size={15} /><span>Try <button type="button" onClick={() => setQuery("ORD-2026-1009")}>ORD-2026-1009</button> to see the cancelled-order refund route.</span></div></form>{response ? <div className="lookup-result"><div className="result-heading"><div><span className="eyebrow">RETURN ROUTE FOUND</span><h2>{response.title}</h2></div><div className="result-icon"><CheckCircle2 size={21} /></div></div><p className="result-copy">{response.body}</p>{response.order && <div className="status-record"><div><span>ORDER</span><strong>{response.order.id}</strong></div><div><span>ITEMS</span><strong>{response.order.items}</strong></div><div><span>ORDER VALUE</span><strong>${response.order.amount.toFixed(2)}</strong></div><div><span>STATUS</span><Badge className="status-badge status-amber">{response.order.statusLabel}</Badge></div></div>}{response.actions && <Button className="result-action" variant="outline" onClick={() => navigate("/support-agent")}>{response.actions[0]} <ArrowRight size={16} /></Button>}</div> : <div className="empty-route"><RotateCcw size={22} /><div><strong>Return guidance will appear here</strong><p>We’ll keep the answer tied to the order state, so a cancelled order does not get the same advice as a delivered one.</p></div></div>}</section><aside className="simple-flow-side"><div className="side-card"><div className="side-star"><Compass size={23} /></div><span className="eyebrow">NORTHSTAR PROMISE</span><h3>No vague “contact us” loops.</h3><div className="side-item"><span>01</span><p>We explain if a return is appropriate.</p></div><div className="side-item"><span>02</span><p>We distinguish a refund from a return.</p></div><div className="side-item"><span>03</span><p>We hand off exceptions with context.</p></div></div></aside></div>
    </main>
  );
}
