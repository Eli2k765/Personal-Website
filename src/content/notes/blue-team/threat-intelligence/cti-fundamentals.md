---
title: CTI Fundamentals
tags: [blue-team, cti, pyramid-of-pain, kill-chain, diamond-model]
description: The frameworks of Cyber Threat Intelligence.
date: 2024-01-02
---

# CTI Fundamentals

## 1. The Pyramid of Pain
Describes how hard it is for an attacker to change their indicators when you detect them.
- **Hash Values** (Trivial): Trivial for attacker to change (add 1 byte).
- **IP Address** (Easy): Easy to change (Proxy/VPN).
- **Domain Names** (Simple): Simple to register new ones.
- **Network/Host Artifacts** (Annoying): "User-Agent", Registry keys.
- **Tools** (Challenging): Changing the actual C2 framework (Cobalt Strike to Sliver) is hard.
- **TTPs** (Tough): Tactics, Techniques, and Procedures. Changing *behavior* (e.g., "Pass-the-Hash") is incredibly difficult because it requires relearning tradecraft. **Focus Detection Here.**

## 2. Cyber Kill Chain
Lockheed Martin's model. Breaking any link stops the attack.
1.  **Reconnaissance**: Harvesting email addresses.
2.  **Weaponization**: Creating the PDF exploit.
3.  **Delivery**: Sending the email.
4.  **Exploitation**: Vulnerability triggers code execution.
5.  **Installation**: Malware installs (Persistence).
6.  **C2**: Beacons home.
7.  **Actions on Objectives**: Ransomware / Exfil.

## 3. Diamond Model
4 Vertices used to cluster activity.
- **Adversary**: Who are they?
- **Infrastructure**: What IP/Domain?
- **Capability**: What malware/exploit?
- **Victim**: Who are they targeting?
- *Pivot*: If you see an attacker using *Infrastructure X*, you pivot to see what *Capabilities* were hosted there.
