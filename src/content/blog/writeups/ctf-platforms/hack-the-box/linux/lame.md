---
title: "HTB: Lame"
tags: [htb, linux, easy, smb, distcc, metaploit]
date: 2024-01-01
description: Exploiting legacy SMB vulnerabilities (CVE-2007-2447) and Distcc on a beginner Linux machine.
---

# Hack The Box: Lame

**Difficulty**: Easy  
**OS**: Linux  

## Reconnaissance

### Nmap
```bash
nmap -sC -sV 10.10.10.3
```
- **Port 21 (FTP)**: Vsftpd 2.3.4 (Backdoored version, but patched here).
- **Port 139/445 (SMB)**: Samba 3.0.20-Debian.
- **Port 3632 (Distcc)**: Distributed Compiler.

## Exploitation

### Path A: Samba UserMap Script
Samba 3.0.20 has a command injection vulnerability in the username field (CVE-2007-2447).
- **Payload**: Using Metasploit `exploit/multi/samba/usermap_script`.
- **Manual**: Sending a specific payload via `smbclient` allows RCE as root.

### Path B: Distcc Execution
Distcc v1 can be abused to execute code.
- **Tools**: Nmap script `distcc-cve2004-2687` or Metasploit.

## Flag
`root.txt`: Found in `/root/root.txt`.
