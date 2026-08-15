# Northstar Sprint — Day 3 QA Test Results

**Role:** QA / Demo
**Day:** 3
**Purpose:** Execute the 12 predefined QA scenarios against the Northstar prototype, record the actual behaviour, and report every failure as a separate issue/task.

---

# QA Execution Rules

Each test is evaluated against the expected behaviour defined on Day 2.

A test is:

* **PASS** when the actual behaviour matches the expected behaviour.
* **FAIL** when the system behaves incorrectly, gives misleading information, crashes, or fails to handle the scenario appropriately.
* **BLOCKED** when the test cannot be executed because the prototype or required test data is unavailable.

Every failed test must be reported separately rather than being grouped into one general bug report.

---

# Test Results

## QA-01 — Normal Order Tracking

**Customer question:**

> Where is my order?

**Expected result:**

The system should identify the customer's order and provide its current status and relevant delivery information.

**Actual result:**

Your order was delivered
Order ORD-2026-1001 · Stainless steel water bottle ×1. Delivered Aug 1. If you cannot find it, check nearby entrances and with household members first, then contact support for a delivery investigation.

**Result:**

PASS

**Bug/Issue:**

NONE

---

## QA-02 — Order Dispatch Status

**Customer question:**

> Has my order been shipped yet?

**Expected result:**

The system should provide the correct dispatch/shipping status of the order.

**Actual result:**

Your package is on its way
Order ORD-2026-1002 · Wireless mouse ×1, USB-C cable ×2. Carrier: FedEx 7840 1000 0000 0002. Tracking can take 24–48 hours to show its first scan after the shipping email.

**Result:**

PASS

**Bug/Issue:**

NONE

---

## QA-03 — Expected Delivery

**Customer question:**

> When will my package arrive?

**Expected result:**

The system should provide the appropriate expected delivery information.

**Actual result:**

Your order is being prepared
Order ORD-2026-1003 · Ceramic mug set ×1. Our warehouse is picking and packing it now. You’ll receive a tracking link as soon as it leaves the facility. Standard processing is typically 1–2 business days.

**Result:**

PASS

**Bug/Issue:**

NONE

---

## QA-04 — Delayed Order

**Customer question:**

> My package is late. Can you check what's happening?

**Expected result:**

The system should recognize the delayed-order situation and provide the appropriate status/information rather than treating the order as a normal on-time delivery.

**Actual result:**

Your delivery is delayed
Order ORD-2026-1010 · Hiking boots ×1. The carrier reported a weather delay. The revised delivery estimate is August 18. We’re sorry the original ETA was missed; support can open an urgent carrier trace if needed.

**Result:**
PASS

**Bug/Issue:**

NONE

---

## QA-05 — Missing Order

**Customer question:**

> I haven't received my order. Where is it?

**Expected result:**

The system should provide the appropriate order status based on the available order information.

**Actual result:**
Your order is arriving in two parts
Order ORD-2026-1011 · Espresso machine ×1, grinder ×1, tamper ×1. Machine and tamper have shipped. The grinder is backordered until August 20, so the remaining item will follow separately without an extra charge.

**Result:**
PASS
**Bug/Issue:**

NONE

---

## QA-06 — Partial Shipment

**Customer question:**

> I only received part of my order. Where is the rest?

**Expected result:**

The system should correctly identify the partial-shipment situation and provide appropriate information about the remaining items.

**Actual result:**

Your order is arriving in two parts
Order ORD-2026-1011 · Espresso machine ×1, grinder ×1, tamper ×1. Machine and tamper have shipped. The grinder is backordered until August 20, so the remaining item will follow separately without an extra charge.


**Result:**

PASS

**Bug/Issue:**

NONE
---

## QA-07 — Starting a Return

**Customer question:**

> How do I return something I bought?

**Expected result:**

The system should provide clear instructions for starting a return.

**Actual result:**

Your return route is available
Order ORD-2026-1005 is eligible for a standard return review. Tell us the reason for the return and keep the item in its original condition where possible. A support representative will confirm the label and next step.

**Result:**

PASS

**Bug/Issue:**

NONE
---

## QA-08 — Return Request

**Customer question:**

> I want to return my order. What do I need to do?

**Expected result:**

The system should explain the appropriate return process and relevant next steps.

**Actual result:**
Your return route is available
Order ORD-2026-1005 is eligible for a standard return review. Tell us the reason for the return and keep the item in its original condition where possible. A support representative will confirm the label and next step.

**Result:**

PASS

**Bug/Issue:**

NONE
---

## QA-09 — Refund Status

**Customer question:**

> When will I get my refund?

**Expected result:**

The system should provide appropriate refund information based on the available return/refund data.

**Actual result:**

Your return route is available
Order ORD-2026-1005 is eligible for a standard return review. Tell us the reason for the return and keep the item in its original condition where possible. A support representative will confirm the label and next step.

**Result:**

PASS

**Bug/Issue:**

NONE

---

## QA-10 — Wrong Item

**Customer question:**

> I received the wrong item. Can I return it?

**Expected result:**

The system should provide appropriate return guidance for the situation.

**Actual result:**

Let’s find your return or refund
Enter your order number, such as ORD-2026-1002 or 1002, or the email address used at checkout

**Result:**

PASS

**Bug/Issue:**

NONE

---

## QA-11 — Vague Order Question

**Customer question:**

> where my order?

**Expected result:**

The system should recognize the likely order-status intent and either provide an appropriate response or request the information needed to identify the order.

**Actual result:**

Let’s find your order status
Enter your order number, such as ORD-2026-1002 or 1002, or the email address used at checkout.


**Result:**

PASS

**Bug/Issue:**
NONE
---

## QA-12 — Very Vague Request

**Customer question:**

> I need help with my order.

**Expected result:**

The system should avoid making an incorrect assumption and should ask an appropriate clarification question or guide the customer toward the supported order/return options.

**Actual result:**

Let’s find your order status
Enter your order number, such as ORD-2026-1002 or 1002, or the email address used at checkout.


**Result:**
PASS

**Bug/Issue:**

NONE
---

# QA Summary

| Test ID | Scenario              | Result              | Issue   |
| ------- | --------------------- | ------------------- | ------- |
| QA-01   | Normal order tracking | PASS                | NONE    |
| QA-02   | Order dispatch        | PASS                | NONE    |
| QA-03   | Expected delivery     | PASS                | NONE    |
| QA-04   | Delayed order         | PASS                | NONE    |
| QA-05   | Missing order         | PASS                | NONE    |
| QA-06   | Partial shipment      | PASS                | NONE    |
| QA-07   | Starting a return     | PASS                | NONE    |
| QA-08   | Return request        | PASS                | NONE    |
| QA-09   | Refund status         | PASS                | NONE    |
| QA-10   | Wrong item            | PASS                | NONE    |
| QA-11   | Vague order question  | PASS                | NONE    |
| QA-12   | Very vague request    | PASS                | NONE    |

---



# Day 3 QA Completion

* [X] All 12 test cases executed.
* [X] Actual behaviour recorded for every test.
* [X] Every test marked PASS, FAIL, or BLOCKED.
* [X] Evidence captured for important failures.
* [X] Every failure converted into a separate task/card.
* [X] Failed scenarios communicated to the responsible team member.
* [X] No QA failures were fixed directly by QA/Demo.
* [X] Final end-of-day issues reviewed with the team.
* [X] Work saved with a meaningful commit message.

---
