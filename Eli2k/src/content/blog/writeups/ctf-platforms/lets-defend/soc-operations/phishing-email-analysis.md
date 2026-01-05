---
title: "LetsDefend: Phishing Email Analysis"
tags: [letsdefend, blue-team, phishing, email-header, spf-dkim]

description: "Examining Email Headers (SPF, DKIM, DMARC) and attachment sandboxing."
---

# LetsDefend: Phishing Analysis

**Scenario**: Suspicious Email reported.
**Artifact**: `.eml` file.

## 1. Header Analysis
**Return-Path**: `<attacker@evil.com>` (Matches Sender? No, spoofed).
**Received-SPF**: `SoftFail` (IP does not match domain).
**X-Mailer**: `PHP Mailer` (Automated script, not Outlook).

## 2. Body Analysis
"URGENT: INVOICE OVERDUE".
Link: `http://paypal-verify.com` (Typosquat).
Hovers over: `bit.ly/xyz` (Hidden redirect).

## 3. Attachment
`Invoice.html`. It contains Javascript that redirects the browser to a credential harvester.

## Verdict
**Malicious**. Block sender, purge from environment.
