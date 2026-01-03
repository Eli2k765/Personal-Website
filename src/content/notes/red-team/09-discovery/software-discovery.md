---
title: Software Discovery
tags: [discovery, software, security-tools, firewall]
description: Enumerating installed applications and security tools.
date: 2024-01-02
---

# Software Discovery (T1518)

What tools are installed? Is there EDR?

## 1. Security Software Discovery (T1518.001)
Looking for Sysmon, CrowdStrike, SentinelOne.
- **Process List**: `tasklist | findstr /i "cb.exe csagent.exe"`
- **Services**: `sc query | findstr "defense"`
- **Drivers**: `driverquery`

## 2. General Software
- **Registry**: `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall` (List of installed programs).
- **PowerShell**: `Get-WmiObject -Class Win32_Product` (Warning: This triggers an MSI reconfiguration event, very loud).
- **Goal**: Find vulnerable software (Old Java, Old Firefox) to escalate or persist.
