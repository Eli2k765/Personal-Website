---
title: "Tech Debt as Intergenerational Theft"
tags: [business, tech-debt, ethics, finance, southwest-airlines, legacy-code]
date: 2024-01-02
description: "We are borrowing time from future engineers to pay for present velocity. The $800M lesson of Southwest Airlines."
---



We call it "Tech Debt" to make it sound like a financial instrument. "We'll take a loan on code quality now to ship faster, and pay it back later."
But in finance, *you* pay back your loan.
In software, the person who takes the loan (The Senior Architect / PM) gets the bonus for shipping on time.
The person who pays it back is the Junior Engineer hired 3 years later, who drowns in the spaghetti code.

This isn't debt; it's **Intergenerational Theft**.

## Part I: The Interest Rate of Bad Code

Every line of "quick and dirty" code is a liability. It accrues interest in the form of **Friction**.
*   **Principal**: The refactoring work needed to fix it.
*   **Interest**: The extra 20% of time every future feature takes because the codebase is brittle.

Eventually, the interest payments exceed the engineering capacity. You enter **Technical Bankruptcy**. You can no longer ship features. You can only patch bugs.

## Part II: The Default Event (Southwest Airlines)

In December 2022, the bill came due for Southwest Airlines.
While other airlines recovered from a winter storm, Southwest collapsed. They cancelled 16,700 flights.
*   **The Cost**: $800 Million.
*   **The Cause**: "SkySolver," a legacy crew-scheduling system from the 1990s.

For decades, management had treated IT as a cost center. They stripped the "OpEx" budget to pay dividends and buy back stock. They ignored the warnings of the unions and engineers.
They successfully looted the future to pay the past.
But nature (a winter storm) eventually audited the books.

## Part III: Refactoring as Capital Expenditure

How do we stop the theft? We must change the accounting.
CFOs hate "Maintenance" (OpEx). They love "Assets" (CapEx).
We need to reframe Refactoring.
*   **Bad Pitch**: "We need 2 months to clean up the code." (Sounds like janitorial work).
*   **Good Pitch**: "We are investing in **Velocity Liquidity**." (Sounds like an asset).

## Conclusion: The Ethics of Code

Writing clean code is not just about aesthetics. It is an **Ethical Act**.
To write maintainable code is to say, "I respect the time of the human being who will sit in this chair after me."
To write garbage is to say, "My deadline is more important than your life."
Stop stealing from the future.
