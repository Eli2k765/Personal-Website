---
title: "LetsDefend: Event ID 88 - Phishing URL"
tags: [letsdefend, blue-team, edr, browser-forensics]
date: 2024-01-01
description: Correlating EDR alerts with browser history.
---

# LetsDefend: Event ID 88

**Alert**: EDR Blocked a Malicious URL.

## Investigation
1.  **Alert Info**: Host `Workstation-01`, User `Bob`, Process `chrome.exe`.
2.  **Timeline**: Alert fired at 14:00.
3.  **Log Analysis**: Browsing history shows user visited `web-mail-login.com` (Typosquatting) via a link from Gmail.
4.  **Process Lineage**: `Explorer.exe` -> `Chrome.exe`. No child processes spawned (Attack blocked).
5.  **Verdict**: **True Positive** (Attempted Credential Harvesting).
