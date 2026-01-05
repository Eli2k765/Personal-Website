---
title: "Tech Debt as Intergenerational Theft"
tags: [business, tech-debt, ethics, finance, southwest-airlines, legacy-code]

description: "We are borrowing time from future engineers to pay for present velocity. The $800M lesson of Southwest Airlines."
---

We call it "Tech Debt" to make it sound sophisticated, like a financial instrument. "We'll take a loan on code quality now to ship faster, and pay it back later."

But in finance, *you* adhere to a repayment schedule.
In software, the person who takes the loan (The Senior Architect, the Product Manager) gets the bonus for shipping on time. The person who pays it back is the Junior Engineer hired three years later, who drowns in the spaghetti code.

This isn't debt. It’s **Intergenerational Theft**.

## The Interest Rate of Bad Code

Every line of "quick and dirty" code is a liability. It accrues interest in the form of **Friction**.
*   **Principal**: The actual refactoring work needed to fix the mess.
*   **Interest**: The extra 20% of time every future feature takes because the codebase is brittle / undocumented / terrifying.

Eventually, the interest payments exceed your engineering capacity. You enter **Technical Bankruptcy**. You can no longer ship features. You can only patch bugs. You are dead in the water.

## The $800 Million Audit: Southwest Airlines

In December 2022, the bill came due for Southwest Airlines.
A winter storm hit the US. Every airline struggled, but Southwest collapsed. They cancelled 16,700 flights. Families were stranded. The stock tanked. The cost? Estimated at **$800 Million**.

The cause wasn't the weather. It was "SkySolver," a legacy crew-scheduling system from the 1990s that required manual phone calls when the automated matching failed.
For decades, management treated IT as a cost center. They stripped the "OpEx" budget to pay dividends and buy back stock. They successfully looted the future to pay the past.
But nature eventually audited the books.

## Refactoring is Stewardship

How do we stop the theft? We have to change the accounting.
CFOs hate "Maintenance" (OpEx). They love "Assets" (CapEx).
We need to reframe Refactoring not as "cleaning up," but as investing in **Velocity Liquidity**.
Writing clean code is not an aesthetic choice; it is an **Ethical Act**. To write maintainable code is to say, "I respect the time and sanity of the human being who will sit in this chair after me."
To write garbage is to say, "My deadline is more important than your life."
Stop stealing from the future.
