---
title: Inter-Process Communication
tags: [execution, com, dde, dcom, office]
description: Abusing mechanisms that allow processes to talk to each other to execute code (COM, DDE).
date: 2024-01-02
---

# Inter-Process Communication (T1559)

Using the system's internal plumbing to run code.

## 1. Component Object Model (COM)
COM allows objects to interact. Use PowerShell to instantiate malicious objects.
- **Excel.Application**:
  ```powershell
  $excel = New-Object -ComObject Excel.Application
  $excel.RegisterXLL("C:\malware.dll")
  ```
- **ShellBrowserWindow**: Spawning a process via Explorer to bypass parents checks.

## 2. Dynamic Data Exchange (DDE)
Legacy protocol in Microsoft Office.
- **Attack**: Embed a field in Word:
  `{ DDEAUTO c:\\windows\\system32\\cmd.exe "/k calc.exe" }`
- **Result**: Calculator pops when document opens (if user clicks "Yes" to two prompts).

## 3. XPC Services (macOS)
The macOS equivalent of COM. Hijacking XPC services allows privilege escalation.
