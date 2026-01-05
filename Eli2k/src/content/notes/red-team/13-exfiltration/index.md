---
title: "13. Exfiltration"
tags: [red-team, mitre, exfiltration]
description: The adversary is trying to steal data.
date: 2024-01-02
---

# Exfiltration (TA0010)

Exfiltration consists of techniques that adversaries may use to steal data from your network. Once they’ve collected data, adversaries often package it to avoid detection while removing it. This can include compression and encryption. Techniques for getting data out of a target network typically include transferring it over their command and control channel or an alternate channel and may also include putting size limits on the transmission.

## Strategy
- **Low and Slow**: Trickle data out over days to avoid spikes in network traffic.
- **Alternate Channels**: Use non-monitored protocols (DNS, ICMP) or services (Google Drive).
