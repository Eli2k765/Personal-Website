---
title: "HTB: Bastion"
tags: [htb, windows, medium, backup, vhd, hash-cracking]
date: 2024-01-01
description: Extracting credentials from mounted VHD backup files.
---

# Hack The Box: Bastion

**Difficulty**: Medium  
**OS**: Windows  

## Reconnaissance
- SMB Shares: `Backups` share is readable.
- Contains a monolithic VHD (Virtual Hard Disk) file.

## Exploitation
1.  **Mount VHD**: mount the VHD on Linux (`guestmount`).
2.  **SAM extraction**: Extract `Windows\System32\config\SAM` and `SYSTEM` hives from the backup image.
3.  **Crack**: Dump hashes (`impacket-secretsdump`) and crack NTLM.

## Privilege Escalation
- The cracked password allows SSH access.
- **mRemoteNG**: The machine has mRemoteNG installed with stored credentials.
- **Decrypt**: Use a decryption script to recover the Administrator password from the configuration file.
