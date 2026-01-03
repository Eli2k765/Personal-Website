---
title: "LetsDefend: Phishing Email Analysis"
tags: [letsdefend, blue-team, phishing, email-analysis]
date: 2024-01-01
description: Analyzing email headers (SPF/DKIM) and malicious attachments.
---

# LetsDefend: Phishing Email Analysis

**Scenario**: User reported a suspicious email.

## Analysis Steps
1.  **Header Analysis**:
    - **Return-Path**: Mismatch with `From` address.
    - **SPF**: `SoftFail` (Sender IP not authorized).
    - **DKIM**: Signature missing.
2.  **Attachment**:
    - File: `Invoice_2024.docm` (Macro-enabled Word doc).
    - **OLETools**: `olevba` confirms malicious VBA macro attempting to download an EXE.
3.  **Verdict**: **True Positive**.
