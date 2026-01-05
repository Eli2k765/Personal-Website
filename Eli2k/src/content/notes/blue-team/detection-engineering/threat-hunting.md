---
title: Threat Hunting
tags: [blue-team, hunting, picerl, hypothesis]
description: Proactive search for undiscovered threats.
date: 2024-01-02
---

# Threat Hunting

Assuming the breach has already happened.

## 1. The Hypothesis
Hunting is not "scrolling through logs". It starts with a question.
- **Bad Hypothesis**: "I'll look for bad stuff in the firewall logs."
- **Good Hypothesis**: "If an attacker used Kerberoasting, I would see high volumes of TGS requests (Event 4769) with RC4 encryption (Ticket Encryption Type 0x17) from a single user."

## 2. The Hunt Loop
1.  **Hypothesis**: Define attack TTP (MITRE ATT&CK).
2.  **Data**: Identify required logs/proof.
3.  **Execute**: Query the SIEM/Endpoints.
4.  **Analyze**: Filter out admins/service accounts (exclude known good).
5.  **Outcome**:
    - **Incident**: Found evil -> Trigger IR.
    - **Gap**: No logs found -> Request new logging.
    - **Detection**: Found attack pattern -> convert Hunt query into automated Alert.

## 3. Outlier Analysis (Stacking)
- **Long Tail Analysis**: "Show me the least common `svchost.exe` parent processes."
- **Frequency Analysis**: "Show me users who logged into >50 hosts in 1 hour."
