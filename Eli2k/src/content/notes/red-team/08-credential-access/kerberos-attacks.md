---
title: Kerberos Attacks
tags: [credential-access, kerberos, active-directory, golden-ticket, kerberoasting]
description: Abusing the Kerberos authentication protocol to steal credentials and forge tickets.
date: 2024-01-02
---

# Steal or Forge Kerberos Tickets (T1558)

The Crown Jewels of Active Directory.

## 1. Kerberoasting
Targeting Service Accounts (SPNs).
- **Theory**: Any user can request a TGS (Ticket) for any service (e.g., SQL Server). This ticket is encrypted with the Service Account's NTLM hash.
- **Attack**:
  1.  Request TGS for `MSSQLSvc/db.corp.local`.
  2.  Take the ticket offline.
  3.  Crack it (Brute-force) to recover the Service Account password.
- **Tool**: Rubeus or Impacket (`GetUserSPNs.py`).

## 2. AS-REP Roasting
Targeting users with "Do not require Kerberos preauthentication" enabled.
- **Theory**: You can ask the KDC for a TGT for these users *without* knowing their password. The KDC sends back an encrypted chunk.
- **Attack**: Crack that chunk to get the user's password.

## 3. Golden Ticket (TGT Forgery)
If you have the `krbtgt` password hash (Domain Compromise), you create your own tickets.
- **Power**: Valid for 10 years, can be for any user (Administrator), works even if user changes password.

## 4. Silver Ticket (TGS Forgery)
If you have a Service Account hash (e.g., SQL), you can forge a ticket specifically for that service.
- **Stealth**: Does not communicate with the Domain Controller (KDC), so less logging.
