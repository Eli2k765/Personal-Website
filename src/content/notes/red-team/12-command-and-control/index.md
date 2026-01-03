---
title: Command and Control
tags: [red-team, mitre, c2]
description: The adversary is communicating with systems under their control.
date: 2024-01-02
---

# Command and Control (TA0011)

Command and Control (C2) consists of techniques that adversaries may use to communicate with systems under their control within a victim network. Adversaries use these techniques to send commands to compromised systems and receive the results.

## Strategy
- **Traffic Blending**: Use HTTPS port 443.
- **Beaconing**: Don't keep the connection open. Check in every 10 minutes (Jitter).
- **Hiding**: Use Domain Fronting or reputable cloud services.
