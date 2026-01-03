---
title: Reconnaissance
tags: [red-team, mitre, recon]
description: The adversary is trying to gather information they can use to plan future operations.
date: 2024-01-02
---

# Reconnaissance (TA0043)

Reconnaissance consists of techniques that involve adversaries actively or passively gathering information that can be used to support targeting. Such information may include details of the victim organization, infrastructure, or staff/personnel. This information can be leveraged by the adversary to aid in other phases of the adversary lifecycle, such as using gathered information to plan and execute Initial Access, to scope and prioritize post-compromise objectives, or to drive and lead further Reconnaissance efforts.

## Techniques Overview
- **Active Scanning**: Probing victim infrastructure via network traffic (Nmap, Masscan).
- **Gather Victim Identity Information**: Emails, credentials, employee names (OSINT).
- **Gather Victim Network Information**: Domains, IP ranges, topology.
- **Search Open Technical Databases**: DNS records, WHOIS, certificates (crt.sh).

## Strategy
Red teams should perform reconnaissance to identify the attack surface, just as a real adversary would. This phase is critical for:
1.  **Identifying Gaps**: Finding unpatched assets or forgotten subdomains.
2.  **Social Engineering Prep**: Finding valid email addresses and organizational hierarchy.
3.  **Payload Customization**: Understanding the target's stack to tailor phishing lures and payloads.
