---
title: Indicator Removal
tags: [defense-evasion, anti-forensics, timestomp, scrubbing]
description: Deleting logs and altering timestamps to hinder forensic analysis.
date: 2024-01-02
---

# Indicator Removal (T1070)

Cleaning the crime scene.

## 1. Clear Windows Event Logs
```powershell
Clear-EventLog -LogName Security
```
*OpSec*: This creates Event ID 1102 ("The audit log was cleared"). This is a huge red flag.

## 2. Timestomp
Modifying the "Date Modified" timestamp of your malware to match `kernel32.dll`.
- **Tool**: Metasploit `timestomp` or PowerShell.
- **Goal**: If the analyst filters by "Files modify in last 24 hours", your file won't show up.

## 3. File Deletion (Secure)
Simply deleting a file allows recovery.
- **SDelete.exe** (Sysinternals): Overwrites the disk sector with 0s.
- **Linux**: `shred -u file.txt`.

## 4. Network Share Connection Removal
Removing the evidence that you mapped a drive to `\\DC01\C$`.
```bash
net use \\DC01\C$ /delete
```
