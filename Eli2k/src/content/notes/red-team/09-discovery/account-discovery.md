---
title: Account Discovery
tags: [discovery, accounts, ad-recon, bloodhound]
description: Enumerating local and domain accounts to find targets.
date: 2024-01-02
---

# Account Discovery (T1087)

Who is here? Who is Admin?

## 1. Local Accounts
- **Command**: `net user`
- **Admins**: `net localgroup Administrators`
- **PowerShell**: `Get-LocalUser`

## 2. Domain Accounts
- **Domain Admins**: `net group "Domain Admins" /domain`
- **PowerShell**: `Get-ADUser -Filter * -Properties *` (Loud).

## 3. BloodHound (Graph Theory)
The ultimate discovery tool.
- **SharpHound**: Collector ingestor runs on the endpoint. Queries DC for sessions, groups, ACLs.
- **Visualization**: Shows "shortest path to Domain Admin".
  - *Example*: User A -> Can Reset Password of User B -> Is Admin on Machine C -> Has Session of Domain Admin.
