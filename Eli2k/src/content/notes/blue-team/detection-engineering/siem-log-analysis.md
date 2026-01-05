---
title: SIEM & Log Analysis
tags: [blue-team, siem, splunk, elk, logging]
description: Centralizing logs for correlation and analysis.
date: 2024-01-02
---

# SIEM & Log Analysis

The brain of the SOC (for now).

## 1. Key Log Sources
If you don't have these, you are blind.
- **Endpoint**: Sysmon (Event ID 1: Process Create, 3: NetConn), PowerShell Script Block Logging (EID 4104), Security Event Log (4624/4625).
- **Network**: Firewall Traffic Logs, DNS Queries (Zeek/Corelight), VPC Flow Logs (Cloud).
- **Identity**: Azure AD Sign-in Logs, Okta System Logs.

## 2. Search logic (SPL/KQL)
- **Splunk (SPL) - Advanced Hunting**:
  *Finding "Rare" Parent-Child relationships (e.g., Word spawning CMD).*
  ```spl
  index=endpoint sourcetype="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" EventCode=1
  | stats count by ParentImage, Image
  | eventstats sum(count) as total
  | eval rarity = count / total
  | where rarity < 0.001
  | sort rarity asc
  | table ParentImage, Image, count, rarity
  ```
  *Explanation*: This calculates the frequency of every process creation pair. Pairs that happen 0.1% of the time (like `winword.exe` -> `cmd.exe`) bubble to the top.
- **KQL (Microsoft Sentinel)**:
  ```kql
  SecurityEvent
  | where EventID == 4688
  | where CommandLine has_all ("powershell", "-enc")
  | summarize count() by Computer, Account
  ```

## 3. Correlation
Linking disparate events to tell a story.
- *Event A*: User logs in from uncommon location (Identity).
- *Event B*: User downloads 5GB of data (Network).
- *Correlation*: **Possible Insider Threat** (A + B within 1 hour).
