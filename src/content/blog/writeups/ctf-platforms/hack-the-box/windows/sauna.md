---
title: "HTB: Sauna"
tags: [htb, windows, easy, active-directory, dcsync, secretsdump]
date: 2024-01-01
description: Username generation from employee lists and DCSync attacks.
---

# Hack The Box: Sauna

**Difficulty**: Easy  
**OS**: Windows (DC)

## Reconnaissance
- Web server has an "About Us" page with employee names.
- **Wordlist Gen**: Create username list (f.last, flast, etc.).

## Initial Access: AS-REP Roasting
- `GetNPUsers.py` against the list finds `fsmith` is roastable.
- Crack the hash.

## Privilege Escalation
- **Secretsdump**: Using `fsmith` creds, we find autologon credentials in the Registry for `svc_loanmgr`.
- **DCSync**: `svc_loanmgr` has DCSync rights. Dump Administrator.
