/* Parcel Atlas reminder: human handoff is a warm transfer, not a dead end—keep context visible and the ask lightweight. */

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Headphones, Mail, MessageSquare, ShieldCheck, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function SupportAgent() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !summary.trim()) { setError("Add your name, email, and a short description so the team can take over cleanly."); return; }
    setError("");
    setSubmitted(true);
  }

  return (
    <main className="simple-flow-page agent-page"><header className="simple-flow-header">
      <div className="destination-header-main">
        <div className="brand-lockup"><img src="/manus-storage/northstar-compass-star_0bb6b2a1.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div>
        <span className="flow-label"><span className="online-dot" /> Human handoff</span>
      </div>
      <div className="destination-header-nav"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to support desk</button></div>
    </header><div className="simple-flow-layout"><section className="simple-flow-main"><div className="simple-flow-kicker"><span className="eyebrow">SUPPORT / HUMAN HANDOFF</span><span className="flow-index">01 · CONTEXT</span></div>{submitted ? <div className="handoff-success"><div className="success-mark"><Check size={25} /></div><span className="eyebrow">REQUEST READY</span><h1>The route is now<br /><em>in human hands.</em></h1><p>Thanks, {name}. A support representative can use the details you shared to continue without making you start over. In a production connection, this step would create a ticket or live chat request.</p><div className="handoff-summary"><div><span>CONTACT</span><strong>{email}</strong></div>{order && <div><span>ORDER</span><strong>{order}</strong></div>}<div><span>ISSUE</span><strong>{summary}</strong></div></div><Button onClick={() => navigate("/")}>Return to support desk <ArrowRight size={17} /></Button></div> : <><h1>Some routes need<br /><em>a human.</em></h1><p className="flow-lede">Give the team enough context to help on the first reply. This prototype keeps the handoff lightweight and never pretends a static answer is enough for an exception.</p><form className="agent-form" onSubmit={submit}><div className="field-grid"><label><span>Your name</span><div className="field-input"><UserRound size={16} /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ava Thompson" /></div></label><label><span>Email address</span><div className="field-input"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div></label></div><label><span>Order number <small>optional</small></span><div className="field-input"><MessageSquare size={16} /><input value={order} onChange={(event) => setOrder(event.target.value)} placeholder="ORD-2026-1002" /></div></label><label><span>What should the team know?</span><textarea value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Tell us what happened and what outcome you need…" rows={5} /></label>{error && <p className="form-error" role="alert">{error}</p>}<Button type="submit">Prepare handoff <ArrowRight size={17} /></Button><div className="lookup-help"><ShieldCheck size={15} /><span>This is a fictional prototype. No live request is sent.</span></div></form></>}</section><aside className="simple-flow-side"><div className="side-card"><div className="side-star"><Headphones size={23} /></div><span className="eyebrow">A BETTER ESCALATION</span><h3>Context travels with you.</h3><div className="side-item"><span>01</span><p>Keep the order number close if one exists.</p></div><div className="side-item"><span>02</span><p>Describe the outcome you need, not just the problem.</p></div><div className="side-item"><span>03</span><p>We’ll make the next reply easier for everyone.</p></div></div></aside></div></main>
  );
}
