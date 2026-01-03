---
title: "HTB: Certified"
tags: [htb, windows, hard, ad-cs, certipy]
date: 2025-01-01
description: Abusing Active Directory Certificate Services (AD CS).
---

# Hack The Box: Certified

**Difficulty**: Hard  
**OS**: Windows

## Concept
Certified serves as a playground for SpecterOps' "Certified Pre-Owned" research.

## Attack Path (ESC1)
1.  **Recon**: `Certipy find` identifies a vulnerable Certificate Template (`ESC1`).
    - *Issue*: `ENROLLEE_SUPPLIES_SUBJECT` is enabled, allowing us to request a cert for ANY user (e.g., Admin).
2.  **Exploit**: Request a certificate for Administrator.
3.  **Auth**: Use the certificate to request a Kerberos TGT (`Certipy auth`).
4.  **Win**: Pass-the-Hash with the retrieved NTLM hash.
