---
title: Phishing for Information
tags: [recon, phishing, spearphishing, vishing]
description: Sending non-malicious lures to elicit information (replies, out-of-office, phone numbers).
date: 2024-01-02
---

# Phishing for Information (T1598)

Unlike "Initial Access Phishing", the goal here is NOT execution. It is **Intelligence**.

## 1. Spearphishing Service
Targeting support tickets or customer service.
- **Technique**: Open a ticket saying "I can't access legitimate-portal.com".
- **Goal**: They reply with "Oh, try using this URL instead" or screenshots of their internal dashboard.

## 2. Spearphishing Attachment / Link
Sending a benign link to track clicks.
- **Canary Tokens**: Embed a 1x1 pixel or a unique URL.
- **Intel Gained**:
  - IP Address (Geo-location).
  - User-Agent (OS/Browser).
  - Software Versions.

## 3. Spearphishing Voice (Vishing)
Calling the Help Desk.
- **Pretext**: "Hi, I'm new here. What VPN client do we use again? Pulse or Cisco?"
- **Result**: They tell you the exact software stack.
