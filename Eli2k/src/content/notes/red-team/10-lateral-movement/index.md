---
title: "10. Lateral Movement"
tags: [red-team, mitre, lateral-movement]
description: The adversary is trying to move through your environment.
date: 2024-01-02
---

# Lateral Movement (TA0008)

Lateral Movement consists of techniques that adversaries use to enter and control remote systems on a network. Following their initial access, adversaries use lateral movement to explore the network to find their target data.

## Strategy
- **Living off the Land**: Use `psexec`, `ssh`, `wmic` rather than custom malware.
- **Credentials**: You need valid credentials (hash or ticket) to move.
- **Pivoting**: Tunnelling traffic through compromised hosts to reach segmented networks.
