---
title: "HTB: Active"
tags: [htb, windows, easy, active-directory, gpp, sysvol]
date: 2024-01-01
description: Exploiting ancient Group Policy Preferences (GPP) vulnerability in SYSVOL.
---

# Hack The Box: Active

**Difficulty**: Easy  
**OS**: Windows (DC)

## Reconnaissance
- SMB: `Replication` share is open (SYSVOL).

## Exploitation
- **GPP cPassword**: Browsing SYSVOL (`Groups.xml`) reveals a `cPassword` attribute.
- **Crack**: Microsoft published the AES key years ago. `gpp-decrypt` reveals the password.

## Privilege Escalation
- **Kerberoasting**: The GPP user can request TGS tickets.
- **Administrator**: Kerberoasting the `Administrator` account (unlikely in real life, but happened here) or exploiting generic AD misconfigs.
