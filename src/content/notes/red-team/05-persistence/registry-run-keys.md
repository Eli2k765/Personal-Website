---
title: Registry Run Keys / Startup Folder
tags: [persistence, registry, startup]
description: Persistence via the Windows Registry "Run" keys and the Startup folder.
date: 2024-01-02
---

# Registry Run Keys / Startup Folder (T1547.001)

Code execution whenever a user logs in.

## 1. Registry Run Keys
These keys are checked by `explorer.exe` during logon.

### User Level (`HKCU`)
Does not require Admin.
- Key: `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
- Key: `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce` (Runs once then deletes itself)

```powershell
# Powershell One-Liner
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "OneDriveUpdate" -Value "C:\Temp\beacon.exe"
```

### System Level (`HKLM`)
Requires Admin. Runs for ALL users.
- Key: `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`

## 2. Startup Folder
Any file placed here executes on login.
- **User**: `C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
- **System**: `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup`

## 3. Advanced Registry Tricks

### Winlogon Helper DLL
Registering a DLL that Winlogon loads to handle authentication events.
- Key: `HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon`
- Value: `Userinit` or `Shell`.
- **Danger**: If you screw this up, you brick the boot process (BSOD/Loop).

### Image File Execution Options (IFEO) - Accessibility Features
Sticky Keys backdoor.
- Key: `HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\sethc.exe`
- Value: `Debugger = "cmd.exe"`
- **Effect**: At RDP login screen, press SHIFT 5 times. Instead of Sticky Keys, you get a SYSTEM shell.

## OpSec
- **Autoruns**: Sysinternals `Autoruns.exe` is the Blue Team's best friend. It highlights these keys instantly.
- **Avoid**: Don't use this as your primary persistence against a competent SOC. Use it for low-level targets.
