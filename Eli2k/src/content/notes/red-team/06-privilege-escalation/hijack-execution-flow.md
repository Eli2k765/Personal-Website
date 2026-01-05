---
title: Hijack Execution Flow
tags: [priv-esc, dll-hijacking, service-hijacking, unquoted-path]
description: Intercepting the execution flow of legitimate programs to run malicious code.
date: 2024-01-02
---

# Hijack Execution Flow (T1574)

Using the trust of a legitimate application to launch our malware.

## 1. DLL Hijacking (DLL Search Order)
When `legit.exe` needs `library.dll`, Windows searches in a specific order:
1.  The directory `legit.exe` is in.
2.  System32.
3.  System Path.

**Attack**:
1.  Find a privileged app that tries to load a missing DLL (e.g., `cscapi.dll`).
2.  Place our malicious `cscapi.dll` in the application's folder.
3.  Restart the app. It loads our DLL as System.

## 2. Unquoted Service Paths
If a service path contains spaces and is unquoted:
`C:\Program Files\Vulnerable App\service.exe`

Windows tries to execute in this order:
1.  `C:\Program.exe`
2.  `C:\Program Files\Vulnerable.exe`
3.  `C:\Program Files\Vulnerable App\service.exe`

**Attack**:
- Drop a binary named `Program.exe` or `Vulnerable.exe` in the path.
- When the service starts (System), it runs our file.

## 3. Services Registry Permissions
If the ACL on a Service's Registry Key (`HKLM\SYSTEM\CurrentControlSet\Services\VulnService`) allows "Write":
1.  Change `ImagePath` to `C:\Temp\malware.exe`.
2.  Stop/Start the service.
3.  You are now System.
