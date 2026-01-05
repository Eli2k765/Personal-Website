---
title: Impair Defenses
tags: [defense-evasion, edr-bypass, logging, firewall]
description: Disabling, modifying, or blinding security tools and logging mechanisms.
date: 2024-01-02
---

# Impair Defenses (T1562)

If you can't bypass the lock, break the lock.

## 1. Disable Windows Event Logging
Stop evidence from being collected.
```bash
# Clear Logs (Event ID 1102 generated)
wevtutil cl Security

# Disable Service (Loud)
sc stop eventlog
```
**Stealthy Method**: Patch the `EtwEventWrite` function in kernel32.dll (Memory) to simply `return 0`. The system *thinks* it is logging, but nothing is written.

## 2. Disable or Modify System Firewall
Allowing your C2 traffic.
```powershell
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False
```

## 3. Indicator Blocking (Drivers)
BYOVD (Bring Your Own Vulnerable Driver).
1.  Load a signed, legit driver (e.g., older Anti-Cheat driver) that has a vulnerability.
2.  Exploit the driver to enter Kernel Mode (Ring 0).
3.  Use Kernel access to kill the EDR's protected process (`MsMpEng.exe`).

## 4. Safe Mode Boot
Restarting the machine in Safe Mode. Most AV/EDR drivers do *not* load in Safe Mode.
- Attack: Set persistence, reboot to Safe Mode, execute payload, exfiltrate data.
