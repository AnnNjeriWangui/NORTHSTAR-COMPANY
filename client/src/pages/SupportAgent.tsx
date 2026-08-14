

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
        <div className="brand-lockup"><img src="/northstar-compass-star.png" alt="Northstar compass star" /><div><strong>northstar</strong><span>retail support</span></div></div>
        <span className="flow-label"><span className="online-dot" /> Contact an agent</span>
      </div>
      <div className="destination-header-nav"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to support desk</button></div>
    </header><div className="simple-flow-layout"><section className="simple-flow-main"><div className="simple-flow-kicker"><span className="eyebrow">SUPPORT / AGENT</span><span className="flow-index">01 · CONTEXT</span></div>{submitted ? <div className="handoff-success"><div className="success-mark"><Check size={25} /></div><span className="eyebrow">REQUEST RECEIVED</span><h1>Your request<br /><em>is with the team.</em></h1><p>Thanks, {name}. A support representative will have your details and can follow up without asking you to start over.</p><div className="handoff-summary"><div><span>CONTACT</span><strong>{email}</strong></div>{order && <div><span>ORDER</span><strong>{order}</strong></div>}<div><span>ISSUE</span><strong>{summary}</strong></div></div><Button onClick={() => navigate("/")}>Back to support desk <ArrowRight size={17} /></Button></div> : <><h1>Speak to<br /><em>an agent</em></h1><p className="flow-lede">Give us enough context to help you on the first reply. Include your order number if you have one.</p><form className="agent-form" onSubmit={submit}><div className="field-grid"><label><span>Your name</span><div className="field-input"><UserRound size={16} /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></div></label><label><span>Email address</span><div className="field-input"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div></label></div><label><span>Order number <small>optional</small></span><div className="field-input"><MessageSquare size={16} /><input value={order} onChange={(event) => setOrder(event.target.value)} placeholder="ORD-2026-1002" /></div></label><label><span>What do you need help with?</span><textarea value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Describe the issue and what outcome you need." rows={5} /></label>{error && <p className="form-error" role="alert">{error}</p>}<Button type="submit">Send to support team <ArrowRight size={17} /></Button><div className="lookup-help"><ShieldCheck size={15} /><span>No live request is sent in this demo environment.</span></div></form></>}</section><aside className="simple-flow-side"><div className="side-card"><div className="side-star"><Headphones size={23} /></div><span className="eyebrow">BEFORE YOU SEND</span><h3>Tips for a faster reply.</h3><div className="side-item"><span>01</span><p>Include the order number if the issue is order-related.</p></div><div className="side-item"><span>02</span><p>Describe the outcome you need, not just what went wrong.</p></div><div className="side-item"><span>03</span><p>One message with full context beats several back-and-forths.</p></div></div></aside></div></main>
  );
}
