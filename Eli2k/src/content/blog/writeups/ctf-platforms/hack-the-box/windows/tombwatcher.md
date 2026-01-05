---
title: "HTB: Tombwatcher"
tags: [htb, windows, hard, database, ad, pivoting]

description: "A complex chain involving Database exploitation and Active Directory pivoting."
---

# Hack The Box: Tombwatcher

**Machine IP**: `10.10.11.x`
**OS**: Windows
**Difficulty**: Hard

*Note: This machine is a placeholder for the "Hard" AD methodology.*

## 1. Reconnaissance
The web application allows SQL queries.
We identify **Blind SQL Injection**.

## 2. Exploitation
We map the DB schema.
We extract the `xp_cmdshell` capability (often disabled, but if enabled...).
We gain RCE as `Device\MSSQL`.

## 3. Pivot
We are a service account. We are trapped in a constrained environment.
We find connection strings to other servers.
We pivot via **Chisol** or **Ligolo-ng** to the internal subnet.

## 4. Domain Compromise
We identify an unpatched Domain Controller.
Zerologon (CVE-2020-1472)? Checked.
No. We find a misconfigured **Certificate Authority**.
We forge a cert -> Admin.

## Conclusion
Databases are often the soft underbelly of a hardened AD environment.
