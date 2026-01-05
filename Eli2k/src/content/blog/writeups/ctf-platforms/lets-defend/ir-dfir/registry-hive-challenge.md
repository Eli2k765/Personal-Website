---
title: "LetsDefend: Registry Forensics"
tags: [letsdefend, blue-team, registry, shimcache, amcache]

description: "Analyzing ShimCache and AmCache to prove exploit execution."
---

# LetsDefend: Registry Forensics

**Scenario**: Did the user run `mimikatz.exe`?
**Artifact**: `SYSTEM` hive.

## 1. ShimCache (AppCompatCache)
Located in `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache`.
It tracks executables for compatibility.
**It works even if the file is deleted.**
We parse it with `AppCompatCacheParser.exe`.
Finding: `mimikatz.exe` - Last Modified Time matches the attack window.

## 2. UserAssist
Located in `NTUSER.DAT`. Tracks GUI execution (double clicks).
If found here, it proves the *user* ran it, not a system service.

## Conclusion
The Registry never forgets.
