Northstar Sprint — QA Customer Question Bank

Role: QA / Demo
Purpose: Collect realistic customer questions that will later be used to design and execute QA tests.

---

1. Purpose of This QA Question Bank

The Northstar prototype is intended to automatically handle two common customer-service questions:

1. Where is my order?
2. How do I return this?

The purpose of this document is to collect realistic ways a customer might ask these questions.

The questions deliberately include:

- Normal customer wording
- Different ways of asking the same question
- Short questions
- Informal wording
- Vague questions
- Poorly worded questions
- Questions involving different order situations

These questions will be reviewed and selected for the formal 12-question QA test set on Day 2.

---

2. Order Status Questions

A. Normal Order Tracking

QA-Q01

Customer: Where is my order?

Intent: Customer wants to know the current location/status of an order.

---

QA-Q02

Customer: Where is my package?

Intent: Customer wants the current status of their delivery.

---

QA-Q03

Customer: Can you tell me where my order is?

Intent: Customer wants information about the current order status.

---

QA-Q04

Customer: Has my order been shipped?

Intent: Customer wants to know whether the order has been dispatched.

---

QA-Q05

Customer: Has my package been dispatched yet?

Intent: Customer wants confirmation of dispatch.

---

QA-Q06

Customer: When will my order arrive?

Intent: Customer wants the expected delivery information.

---

QA-Q07

Customer: When am I supposed to receive my package?

Intent: Customer wants the expected delivery date/timeframe.

---

QA-Q08

Customer: Is my order on the way?

Intent: Customer wants to know whether the order is currently being delivered.

---

3. Delayed Order Questions

QA-Q09

Customer: My package is late, when will it arrive?

Intent: Customer wants information about a delayed order.

---

QA-Q10

Customer: My order hasn't arrived yet. What's happening?

Intent: Customer wants an explanation/status for an order that has not arrived.

---

QA-Q11

Customer: Why is my order taking so long?

Intent: Customer wants information about a delayed delivery.

---

QA-Q12

Customer: My delivery is delayed. Can you check it?

Intent: Customer wants the current status of a delayed order.

---

4. Lost Order Questions

QA-Q13

Customer: I haven't received my package. Where is it?

Intent: Customer believes the package may be lost or significantly delayed.

---

QA-Q14

Customer: My package hasn't arrived and it's past the delivery date.

Intent: Customer wants assistance with a potentially lost/late delivery.

---

QA-Q15

Customer: I think my package is lost.

Intent: Customer wants help with a potentially lost order.

---

5. Partially Shipped Order Questions

QA-Q16

Customer: I only received part of my order. Where is the rest?

Intent: Customer wants information about items that have not yet arrived.

---

QA-Q17

Customer: One item arrived but the others didn't. What's happening?

Intent: Customer wants information about a partially fulfilled order.

---

QA-Q18

Customer: Why didn't I receive everything I ordered?

Intent: Customer wants information about missing items from an order.

---

6. Cancelled Order Questions

QA-Q19

Customer: What happened to my cancelled order?

Intent: Customer wants information about an order marked as cancelled.

---

QA-Q20

Customer: I cancelled my order. What happens now?

Intent: Customer wants information about the status/consequences of a cancelled order.

---

7. Delivery Address Problems

QA-Q21

Customer: I entered the wrong delivery address. What should I do?

Intent: Customer needs assistance with an order containing an incorrect address.

---

QA-Q22

Customer: I put the wrong address on my order.

Intent: Customer wants assistance regarding an incorrect delivery address.

---

8. Return Questions

A. Starting a Return

QA-Q23

Customer: How do I return something I bought?

Intent: Customer wants return instructions.

---

QA-Q24

Customer: I want to return my order.

Intent: Customer wants to start the return process.

---

QA-Q25

Customer: How can I send this item back?

Intent: Customer wants return instructions.

---

QA-Q26

Customer: What's the process for returning an item?

Intent: Customer wants to know the return process.

---

QA-Q27

Customer: Can I return something I ordered?

Intent: Customer wants to know whether a return is possible.

---

9. Refund Questions

QA-Q28

Customer: When will I get my refund?

Intent: Customer wants information about the refund timeframe.

---

QA-Q29

Customer: How long does a refund take?

Intent: Customer wants information about refund timing.

---

QA-Q30

Customer: I returned my item. When will my money come back?

Intent: Customer wants to know when the refund will be received.

---

QA-Q31

Customer: Has my refund been processed?

Intent: Customer wants the current status of a refund.

---

10. Wrong Item / Return Situation

QA-Q32

Customer: I received the wrong item. Can I return it?

Intent: Customer wants to know how to return an incorrect item.

---

QA-Q33

Customer: The item I received isn't what I ordered.

Intent: Customer wants assistance with an incorrect item.

---

QA-Q34

Customer: I got the wrong product. What do I do?

Intent: Customer wants return/replacement assistance.

---

11. Short and Informal Questions

These are included because real customers may not use complete sentences.

QA-Q35

Customer: Where's my order?

Intent: Order status.

---

QA-Q36

Customer: Package?

Intent: Unclear request potentially relating to an order/package.

---

QA-Q37

Customer: Order status?

Intent: Customer wants order status.

---

QA-Q38

Customer: Return?

Intent: Customer may want return information.

---

QA-Q39

Customer: Refund?

Intent: Customer may want refund information.

---

12. Vague Customer Questions

These are especially important for QA because the customer has not clearly stated what they need.

QA-Q40

Customer: I need help with my order.

Intent: Unclear. The system may need clarification.

---

QA-Q41

Customer: Something is wrong with my order.

Intent: Unclear. The system may need clarification.

---

QA-Q42

Customer: I have a problem with something I bought.

Intent: Unclear. Could potentially relate to delivery or return.

---

QA-Q43

Customer: Can someone help me?

Intent: Very vague customer request.

---

13. Poorly Worded / Typographical Questions

These represent customers who type quickly or make mistakes.

QA-Q44

Customer: wher is my order?

Intent: Order status.

---

QA-Q45

Customer: how do i retun this?

Intent: Return instructions.

---

QA-Q46

Customer: my pakage is late

Intent: Delayed order.

---

QA-Q47

Customer: when will my ordar arrive?

Intent: Delivery information.

---

14. Out-of-Scope Question

QA-Q48

Customer: Is this item back in stock?

Intent: Customer wants stock availability.

QA note: This question is intentionally recorded as an out-of-scope scenario because the current Northstar prototype is focused on order status and returns. The project guide states that stock availability is being skipped because the prototype does not have access to the company's warehouse system.

---

15. QA Thinking Behind This Question Bank

The questions above are designed to test several dimensions of customer input:

Category| What QA wants to learn
Normal wording| Does the system handle common questions?
Different wording| Does the system recognize the same intent when phrased differently?
Delayed orders| Does the system handle non-standard delivery situations?
Lost orders| Does the system avoid giving an inappropriate normal-order response?
Partial shipments| Can the system handle incomplete deliveries?
Cancelled orders| Can the system distinguish cancelled orders?
Returns| Does the system provide the correct return guidance?
Refunds| Does the system provide the correct refund information?
Short questions| Does the system handle incomplete sentences?
Vague questions| Does the system ask for clarification when necessary?
Typographical errors| How tolerant is the system of customer mistakes?
Out-of-scope questions| Does the system avoid pretending to support unavailable information?

---

16. Day 1 QA Outcome

This question bank provides a pool of realistic customer questions from which the formal Day 2 test suite can be selected.

The Day 2 QA test suite should contain 12 questions, including three vague or badly worded questions, as required by the sprint plan.

No test has been marked as PASS or FAIL at this stage because Day 1 is for preparing realistic customer questions. Actual execution and fault reporting will take place during the testing stage.

---

Day 1 QA Checklist

- [x] Identified the two supported customer problems.
- [x] Collected realistic order-status questions.
- [x] Collected delayed, lost, partial, cancelled, and address-related scenarios.
- [x] Collected return and refund questions.
- [x] Included short and informal customer questions.
- [x] Included vague customer questions.
- [x] Included poorly worded/typographical questions.
- [x] Identified an out-of-scope stock question.
- [ ] Select the final 12 QA questions on Day 2.
- [ ] Define expected results for the final 12 tests.