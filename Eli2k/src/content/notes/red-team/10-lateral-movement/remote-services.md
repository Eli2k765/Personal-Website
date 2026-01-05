---
title: Remote Services
tags: [lateral-movement, smb, rdp, winrm, ssh, psexec]
description: Using valid credentials to access remote systems via SMB, RDP, WinRM, and SSH.
date: 2024-01-02
---

# Remote Services (T1021)

Using the front door.

## 1. SMB / Windows Admin Shares (PsExec)
Requires local admin + File & Printer Sharing enabled.
- **Shares**: `C$` (C Drive), `ADMIN$` (Windows Dir), `IPC$` (Inter-Process).
- **PsExec**:
  1.  Copy binary to `\\Target\ADMIN$`.
  2.  Create a Service on Target to run binary.
  3.  Start Service.
- **Impacket**: `psexec.py target.com/user:pass@192.168.1.5`

## 2. Remote Desktop Protocol (RDP)
Interactive GUI access.
- **Hijacking**: If a user is already logged in (Disconnected session), you can steal their session without a password if you are SYSTEM.
  ```bash
  tscon <SessionID> /dest:console
  ```

## 3. Windows Remote Management (WinRM)
PowerShell Remoting. Runs over HTTP (5985) or HTTPS (5986).
- **Command**: `Enter-PSSession -ComputerName Target`
- **Stealth**: Generally cleaner than PsExec (no binary drop).

## 4. SSH
Common on Linux and Windows servers (OpenSSH).
- **Keys**: Access via `id_rsa`.
- **Persistence**: Add your public key to `authorized_keys`.
