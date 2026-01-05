---
title: Boot or Logon Autostart Execution
tags: [persistence, autostart, winlogon, screensaver, netsh]
description: Abusing system mechanisms that run automatically at boot or logon (beyond standard Run keys).
date: 2024-01-02
---

# Boot or Logon Autostart Execution (T1547)

Going deeper than `HKCU\Run`.

## 1. Winlogon Helper DLL
Winlogon handles user logins. It loads DLLs specified in the Registry.
- **Key**: `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon`
- **Value**: `Userinit` or `Shell`.
- **Attack**: Appending `, C:\malware.exe` to the `Userinit` value.
- **Privilege**: Runs as SYSTEM.

## 2. Screensaver Hijack
Windows runs the screensaver (`.scr` which is just an `.exe`) automatically when idle.
- **Key**: `HKCU\Control Panel\Desktop`
- **Values**:
  - `SCRNSAVE.EXE`: Path to malware.
  - `ScreenSaveActive`: 1
  - `ScreenSaveTimeOut`: 60 (Run after 60 seconds).
- **Trick**: Rename `malware.exe` to `photo.scr`.

## 3. Netsh Helper DLL
`netsh.exe` allows loading custom Helper DLLs to extend its functionality.
- **Command**: `netsh add helper C:\evil.dll`
- **Persistence**: Every time `netsh` runs (which is often by VPN scripts or Admins), your DLL loads.
