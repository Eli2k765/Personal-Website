---
title: "3. Initial Access"
tags: [red-team, mitre, phishing, access]
description: The adversary is trying to get into your network.
date: 2024-01-02
---

# Initial Access (TA0001)

Initial Access consists of techniques that use various entry vectors to gain their initial foothold within a network. Techniques used to gain a foothold include targeted spearphishing and exploiting weaknesses on public-facing web servers. Footholds gained through initial access may allow for continued access, like valid accounts and use of external remote services, or may be limited use due to changing passwords.

## Techniques Overview
- **Phishing**: Spearphishing via Link, Attachment, or Service.
- **Valid Accounts**: Using compromised credentials (password spraying, breach data).
- **Exploit Public-Facing Application**: Exploiting vulnerabilities in web apps (SQLi, RCE).
- **External Remote Services**: Accessing VPNs, Citrix, or RDP with valid or exploted creds.
- **Supply Chain Compromise**: Compromising software dependencies or hardware before delivery.

## Strategy
This is often the hardest part of the engagement. A failed Initial Access attempt (e.g., a blocked payload) can alert the SOC and burn the entire operation before it starts.
- **Enumeration First**: Don't spray payloads blindly. Validate targets.
- **Evasion**: Scanners (Proofpoint, Mimecast) will detonate your payload. Use evasion techniques (password protection, HTML Smuggling).
