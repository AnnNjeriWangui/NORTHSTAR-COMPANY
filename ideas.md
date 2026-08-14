# Northstar MVP Design Brainstorm

## Approach 1 — Signal Desk
Very restrained service-operations dashboard: warm paper, navy ink, and a single vermilion signal color. It should feel like a calm, human support desk rather than a generic chatbot.

**Probability:** 0.03

## Approach 2 — Orbit Console
Dark, technical command-center interface with electric accents, dense status readouts, and a futuristic logistics mood. Strong for a systems demo, but risks making a customer-service MVP feel colder than necessary.

**Probability:** 0.07

## Approach 3 — Parcel Atlas
Editorial wayfinding system inspired by postal routing maps, warehouse labels, and premium retail packaging. A soft ivory canvas, ink-black type, and Northstar red create warmth while oversized route marks and a left-rail navigation make the flow legible.

**Probability:** 0.05

# Chosen Approach — Parcel Atlas

## Design Movement
Contemporary editorial wayfinding: Swiss information design softened by premium shipping ephemera and tactile paper textures.

## Core Principles
1. Make every state feel locatable: customers should always know what the system understood and what it needs next.
2. Use generous whitespace and strong left alignment to make the flow feel calm, not robotic.
3. Pair utilitarian operational labels with warm, human response copy.
4. Keep the interface visibly connected to the Northstar brand through repeatable route-marker motifs.

## Color Philosophy
The base is warm ivory rather than clinical white, helping customer-support content feel human. Ink navy carries trust and legibility. Northstar red is reserved for active routing, exceptions, and the primary action so it reads as a deliberate signal. A muted sage marks resolved states without pretending every journey is frictionless.

## Layout Paradigm
An asymmetric two-column console: a narrow persistent route rail on the left, a spacious conversation/work area in the center, and a contextual “what we know” panel on the right on wide screens. On mobile, the rail collapses into a compact header and the context panel moves below the conversation.

## Signature Elements
1. A red compass-star route marker used in the brand mark, active step, and message metadata.
2. Dashed “route line” connectors between journey steps.
3. Shipment-card details styled like premium packing slips: compact labels, generous line-height, and small all-caps metadata.

## Interaction Philosophy
Every action should confirm intent before asking for more information. Quick replies are generous and clear; free-text classification is forgiving but never silent. Unknown questions explain the two supported lanes instead of guessing.

## Animation
Use 180–240ms ease-out transitions for button press, message arrival, and state changes. Let new responses rise 6px and fade in once; route markers can gently shift along their connector when a step activates. Respect reduced-motion preferences and avoid animation on keyboard-driven submit paths.

## Typography System
Use **DM Serif Display** for the main wordmark and page title moments, paired with **IBM Plex Sans** for UI, body copy, and operational labels. Headlines are 48–64px on desktop with tight line-height; section titles are 20–24px; body copy is 15–16px; metadata is 10–11px uppercase with 0.12em letter spacing.

## Brand Essence
Northstar is a calm, self-serve support desk for shoppers who want a clear answer about a package or return without waiting for an agent. **Grounded, precise, reassuring.**

## Brand Voice
Headlines are direct and directional. CTAs sound like helpful next moves, not marketing. Microcopy names uncertainty honestly and offers the next useful action.

Example lines:
- “Let’s find the signal in your order.”
- “I found the package. Here’s what happens next.”

## Wordmark & Logo
Use a compact four-point compass star with one elongated north point, paired with a custom serif wordmark treatment. The mark should work independently in the header and as the favicon; do not render the brand name in a default font as the logo.

## Signature Brand Color
**Northstar red — #D84A3A.** It is warm enough for retail and decisive enough to signal the next route in a support flow.

## File-level Reminder
All edited CSS and component/page files should begin with a short comment reminding the implementer to reinforce the Parcel Atlas direction: warm ivory canvas, ink navy, Northstar red signal, editorial wayfinding, and calm human support language.
