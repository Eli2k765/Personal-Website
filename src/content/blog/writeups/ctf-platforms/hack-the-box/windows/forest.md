---
title: "HTB: Forest"
tags: [htb, windows, easy, active-directory, kerberoasting, bloodhound]
date: 2024-01-01
description: "A complete Active Directory attack path: Enumeration, AS-REP Roasting, and ACL abuse."
---

# Hack The Box: Forest

**Difficulty**: Easy  
**OS**: Windows (Domain Controller)

## Reconnaissance
- **BloodHound**: Used early to map the domain.
- **RPCClient**: Null session enumeration.

## Initial Access: AS-REP Roasting
- **Check**: `GetNPUsers.py` identifies users with "Do not require Kerberos preauthentication" enabled.
- **Crack**: Hashcat mode 18200.

## Privilege Escalation
- **BloodHound Path**: The compromised user is a member of `Account Operators`.
- **Abuse**: Account Operators can add users to `Exchange Windows Permissions`.
- **PrivEsc**: This group has `WriteDacl` on the Domain Object, allowing DCSync rights assignment.
- **DCSync**: Dump Administrator hash.
