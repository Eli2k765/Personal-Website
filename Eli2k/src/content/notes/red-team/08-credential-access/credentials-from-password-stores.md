---
title: Credentials from Password Stores
tags: [credential-access, browsers, keepass, chrome, vault]
description: Decrypting passwords stored in Web Browsers, Password Managers, and Windows Vault.
date: 2024-01-02
---

# Credentials from Password Stores (T1555)

## 1. Web Browsers (Chrome / Edge)
Browsers encrypt saved passwords using the Windows DPAPI (Data Protection API).
- **Key**: Encrypted with the user's logon password. Since you are running as the user, you can decrypt it.
- **Files**:
  - Chrome: `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Login Data` (SQLite DB).
- **Tools**: `HackBrowserData`, Mimikatz `dpapi::chrome`.

## 2. Password Managers (KeePass)
- **KeePass**: Encrypted database (`.kdbx`).
- **Attack**:
  - Keylogging the Master Password.
  - Dumping the Master Key from memory if KeePass is open (KeeThief).

## 3. Windows Credential Manager
Similar to browser passwords but for RDP/SMB.
- **Command**: `vaultcmd /list`
- **Tool**: `Mimikatz` -> `vault::cred`.
