---
title: "HTB: Bashed"
tags: [htb, linux, easy, webshell, cron]
date: 2024-01-01
description: Hunting for web shells and abusing insecure cron jobs.
---

# Hack The Box: Bashed

**Difficulty**: Easy  
**OS**: Linux  

## Reconnaissance
Website discusses a tool called "phpbash".
- **Gobuster**: Finds `/dev/` and `/php/`.
- **Entry**: `/dev/phpbash.min.php` provides a full interactive web shell in the browser.

## Exploitation
Use the web shell to pop a reverse shell back to Kali.

## Privilege Escalation
1.  **Script Kiddie**: The user `scriptmanager` owns a folder `/scripts`.
2.  **Lateral Movement**: `sudo -u scriptmanager /bin/bash`.
3.  **Cron Job**: Inside `/scripts`, there is a python file `test.py` owned by `scriptmanager` but executed by **root** every minute.
4.  **Exploit**: Replace `test.py` content with a Python reverse shell. Wait 1 minute.
