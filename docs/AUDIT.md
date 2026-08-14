# NORTHSTAR-COMPANY Repository Audit

## 1. Tech stack
The repository currently contains no executable application stack. It has only Markdown/plain-text artifacts and no `package.json`, README, source directory, HTML, CSS, JavaScript, TypeScript, Python, route, API, or test files.

## 2. Existing application structure
There is no application structure yet. The repository root contains five committed files: `Create variables`, `Northstar_mock_dataset`, `TEAM_CHARTER.md`, `northstar_order_status_help_dashboard.md`, and `northstar_support_chatbot_script.md`.

## 3. Existing UI
No UI components or pages were found. The content document contains UI placeholders such as an order lookup box, tracking button, quick replies, and escalation blocks, but these are documentation only.

## 4. Existing data
`Northstar_mock_dataset` documents 13 fictional orders: eight baseline orders and five exception orders. The exception states are cancelled, delayed, partly sent, lost, and bad address. `Create variables` contains abbreviated comma-separated order/status variables for the same order IDs, but it is not a structured data file.

## 5. Existing customer-facing content
`northstar_order_status_help_dashboard.md` contains approved self-service order-status FAQ/help-center content. `northstar_support_chatbot_script.md` contains approved rules-based chatbot copy and a detailed state-machine specification covering welcome/routing, lookup, order status, returns/refunds, escalation, closing, fallback, variables, and escalation tags.

## 6. Existing logic
No implementation logic exists. The chatbot script describes the intended deterministic flow, including intent routing, order lookup by order number/email, retry/fallback behavior, order-state branches, return eligibility, refund states, and escalation. These are specifications rather than executable code.

## 7. Existing tests
No test files or test configuration were found.

## 8. What teammates completed
The Data work appears to be the synthetic order dataset and status-variable list. The Content work appears to be the order-status help dashboard and support chatbot script. The team charter identifies Flow/Logic ownership as chatbot routing logic and UI dashboard interaction, but no coding implementation has been pushed yet.

## 9. What is missing for Flow/Logic
The repository is missing a runnable MVP. At minimum, it needs a small application that reuses the committed data/content and implements: intent classification for order status versus returns/refunds; order lookup; state-specific responses for baseline and exception orders; return/refund handling based on the documented flow; unknown-input fallback; invalid/missing lookup handling; and focused tests.

## 10. Exact files recommended for change
Before coding, the smallest practical addition is a new executable project structure that preserves all teammate documents and adds implementation files for the flow engine, structured adapter for the existing dataset, customer-facing response mapping, a minimal UI or CLI entry point, and focused tests. The existing teammate files should not be rewritten except where a narrowly necessary machine-readable integration format must be documented.

## Verification status
The repository was cloned successfully and is clean before this audit. Because there is no executable project configuration, the current repository cannot be run as an application.
