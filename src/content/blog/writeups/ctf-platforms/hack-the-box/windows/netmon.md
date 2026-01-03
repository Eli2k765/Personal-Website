---
title: "HTB: Netmon"
tags: [htb, windows, easy, prtg, config-files]
date: 2024-01-01
description: Exploiting PRTG Network Monitor via default credentials and configuration analysis.
---

# Hack The Box: Netmon

**Difficulty**: Easy  
**OS**: Windows  

## Reconnaissance
- **FTP**: Anonymous access.
- **Web**: PRTG Network Monitor.

## Exploitation
- **Config Hunting**: FTP gives access to `C:\ProgramData\Paessler\PRTG Network Monitor\`.
- **File**: `PRTG Configuration.old.bak`.
- **Finding**: Contains cleartext credentials (`prtgadmin` password).
- **Web Login**: Use creds to log in. PRTG allows executing scripts on alerts.

## Privilege Escalation
- Create a notification/alert that runs a PowerShell script.
- Trigger the alert. The script runs as SYSTEM (service account).
