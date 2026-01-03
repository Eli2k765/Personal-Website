---
title: Digital Forensics
tags: [blue-team, forensics, dfir, volatility, kape]
description: Recovering evidence from disk and memory to reconstruct an attack.
date: 2024-01-02
---

# Digital Forensics

The science of "What happened?"

## 1. Disk Forensics (Dead Box)
Analyzing the hard drive of a powered-off machine.
- **Master File Table ($MFT)**: The NTFS database. Contains timestamps (Created, Modified, Accessed, Entry Modified) for every file.
- **Prefetch**: `/Windows/Prefetch`. proves a binary was executed.
- **Shimcache (AppCompatCache)**: Registry key verifying binary execution history, even if the file was deleted.
- **Tool**: **KAPE** (Kroll Artifact Parser and Extractor) to grab these artifacts quickly.

## 2. Memory Forensics (Live Box)
Analyzing the RAM dump of a running machine.
- **Why?**: Sophisticated malware (Cobalt Strike beacons) runs only in memory and never touches the disk.
- **Tool**: **Volatility 3**.
## 2. Memory Forensics (Live Box)
Analyzing the RAM dump of a running machine.
- **Tool**: **Volatility 3**.
- **Commands**:
  - `python3 vol.py -f memory.dmp windows.malfind`: Scans for hidden/injected code.
    ```text
    PID     Process     Protection  HexDump
    4832    svchost.exe PAGE_EXECUTE_READWRITE
    0x1c0000  4d 5a 90 00 03 00 00 00 (MZ......) -> PE Header found in heap!
    ```
  - `windows.pslist`: List processes. Look for "wermgr.exe" (Windows Error Reporting) with no parent.
  - `windows.netscan`: View active network connections at the time of the dump.

## 3. Timeline Analysis
Combining all artifacts (Event Logs, MFT, Prefetch) into a single "Super Timeline".
- **Tool**: **Plaso / Log2Timeline**.
- **Goal**: "On Jan 2 at 14:00, User downloaded `evil.exe`, executed it at 14:01, and it made a network connection to `bad.com` at 14:02."
