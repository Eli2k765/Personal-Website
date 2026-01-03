---
title: Obtain Capabilities
tags: [resource-dev, exploits, tools, certificates, ai]
description: Acquiring third-party tools, exploits, and certificates rather than developing them in-house.
date: 2024-01-02
---

# Obtain Capabilities (T1588)

Buying vs Building.

## 1. Malware / Tools
- **Cobalt Strike**: The standard. Often pirated/cracked by adversaries, but Red Teams buy licenses.
- **Mimikatz / BloodHound**: Open-source tools.
- **Risk**: Open source tools have signatures everywhere.

## 2. Code Signing Certificates
- **Identify Theft**: Stealing a code signing cert from a dev machine.
- **Black Market**: Buying EV (Extended Validation) certs to bypass SmartScreen.

## 3. Exploits
- **0-Day**: Expensive ($100k+). Rare in Red Teaming.
- **N-Day**: Public PoCs on GitHub.
- **1-Day**: Reverse engineering a patch to find the vuln before the target patches.

## 4. Artificial Intelligence
- **LLMs**: Using ChatGPT/Claude to write phishing emails or troubleshoot code.
- **Deepfakes**: Generating voice/video for vishing.
