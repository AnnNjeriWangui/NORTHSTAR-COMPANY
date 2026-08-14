Northstar Sprint — QA Test Cases

Role: QA / Demo
Day: 2
Purpose: Define the 12 customer scenarios that will be used to test the Northstar prototype.

---

QA Test Cases

QA-01 — Normal Order Tracking

Customer question:

«Where is my order?»

Scenario:
Customer wants to know the current status of their order.

Expected result:
The system should identify the customer's order and provide its current status and relevant delivery information.

Priority: High

---

QA-02 — Order Dispatch Status

Customer question:

«Has my order been shipped yet?»

Scenario:
Customer wants to know whether their order has been dispatched.

Expected result:
The system should provide the correct dispatch/shipping status of the order.

Priority: High

---

QA-03 — Expected Delivery

Customer question:

«When will my package arrive?»

Scenario:
Customer wants to know the expected delivery information.

Expected result:
The system should provide the appropriate expected delivery information for the order.

Priority: High

---

QA-04 — Delayed Order

Customer question:

«My package is late. Can you check what's happening?»

Scenario:
Customer's order is delayed.

Expected result:
The system should recognize the delayed-order situation and provide the appropriate status/information rather than treating the order as a normal on-time delivery.

Priority: High

---

QA-05 — Missing Order

Customer question:

«I haven't received my order. Where is it?»

Scenario:
Customer has not received an expected order.

Expected result:
The system should provide the appropriate order status based on the available order information.

Priority: High

---

QA-06 — Partial Shipment

Customer question:

«I only received part of my order. Where is the rest?»

Scenario:
Only part of an order has been sent or received.

Expected result:
The system should correctly identify the partial-shipment situation and provide the appropriate information about the remaining items.

Priority: High

---

QA-07 — Starting a Return

Customer question:

«How do I return something I bought?»

Scenario:
Customer wants to return an item.

Expected result:
The system should provide clear instructions for starting a return.

Priority: High

---

QA-08 — Return Request

Customer question:

«I want to return my order. What do I need to do?»

Scenario:
Customer wants to initiate a return.

Expected result:
The system should explain the appropriate return process and any relevant next steps.

Priority: High

---

QA-09 — Refund Status

Customer question:

«When will I get my refund?»

Scenario:
Customer wants to know when their refund will be received.

Expected result:
The system should provide the appropriate refund information based on the available return/refund data.

Priority: High

---

QA-10 — Wrong Item

Customer question:

«I received the wrong item. Can I return it?»

Scenario:
Customer received an incorrect item and wants to return it.

Expected result:
The system should provide appropriate return guidance for the situation.

Priority: Medium

---

QA-11 — Vague Order Question

Customer question:

«where my order?»

Scenario:
Customer is asking about an order using incomplete/informal wording.

Expected result:
The system should recognize the likely order-status intent and either provide the appropriate response or request the information needed to identify the order.

Priority: Medium

---

QA-12 — Very Vague Request

Customer question:

«I need help with my order.»

Scenario:
Customer indicates they need assistance but does not explain the specific problem.

Expected result:
The system should avoid making an incorrect assumption and should ask an appropriate clarification question or guide the customer toward the supported order/return options.

Priority: Medium

---

Test Execution Record

The following fields will be completed when the tests are executed on Day 3.

Test ID| Actual Result| Pass/Fail| Bug/Issue| Evidence
QA-01| Pending| Pending| —| —
QA-02| Pending| Pending| —| —
QA-03| Pending| Pending| —| —
QA-04| Pending| Pending| —| —
QA-05| Pending| Pending| —| —
QA-06| Pending| Pending| —| —
QA-07| Pending| Pending| —| —
QA-08| Pending| Pending| —| —
QA-09| Pending| Pending| —| —
QA-10| Pending| Pending| —| —
QA-11| Pending| Pending| —| —
QA-12| Pending| Pending| —| —

---

QA Coverage

The 12 tests cover the following areas:

- Normal order tracking
- Order dispatch status
- Expected delivery
- Delayed orders
- Missing orders
- Partial shipments
- Starting a return
- Return requests
- Refund status
- Wrong-item returns
- Vague/informal customer input
- Very vague customer requests

The test set intentionally includes vague/informal questions so that the prototype is tested with realistic customer input rather than only perfectly written questions.

---

Day 2 Definition of Done

- [x] 12 customer questions have been defined.
- [x] Questions are written in realistic customer language.
- [x] At least three tests include vague or badly worded customer input.
- [x] Expected behaviour has been defined for each test.
- [x] Each test has a priority.
- [x] Test execution results remain pending until the actual QA run.
- [ ] Execute all 12 tests on Day 3.
- [ ] Record actual results.
- [ ] Create a separate issue/card for every failure.