---
title: Resource Development
tags: [red-team, mitre, infrastructure, c2]
description: The adversary is trying to establish resources they can use to support operations.
date: 2024-01-02
---

# Resource Development (TA0042)

Resource Development consists of techniques that involve adversaries creating, purchasing, or compromising resources that can be used to support targeting. This includes infrastructure (domains, servers), accounts (email, social media), and capabilities (malware signing certificates, exploits).

## Techniques Overview
- **Establish Accounts**: Creating email or social media accounts for persona development.
- **Acquire Infrastructure**: Buying domains, VPS components, or serverless functions.
- **Compromise Infrastructure**: Hijacking legitimate sites (WordPress) for command and control.
- **Develop Capabilities**: Writing malware, creating exploits, or modifying open-source tools.

## Strategy
This phase is where the "Red Team" sets up the stage. Good resource development focuses on **resilience** and **reputation**.
- **Resilience**: If one C2 server is blocked, the operation should continue via a redirector or fallback channel.
- **Reputation**: Newly registered domains are suspicious. Assets should be aged or categorized (e.g., Health, Finance) before use.
