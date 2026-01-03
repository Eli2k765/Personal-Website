---
title: Unsecured Credentials
tags: [credential-access, passwords, gpo, files]
description: Finding credentials stored insecurely in files, registry, or group policy.
date: 2024-01-02
---

# Unsecured Credentials (T1552)

Users are lazy. They save passwords in files.

## 1. Credentials in Files
Searching file shares for gold.
- **Command**: `findstr /s /i "password" *.xml *.ini *.txt`
- **Targets**: `web.config`, `unattend.xml` (Windows Install), `id_rsa` (SSH Keys).

## 2. Group Policy Preferences (GPP)
Legacy issue (MS14-025). Domain Admins used to push local admin passwords via GPO.
- The password is encrypted with a *publicly known* AES key.
- **Attack**: Read the `Groups.xml` in SYSVOL, decrypt the `cpassword` field.

## 3. Shell History
- **Linux**: `~/.bash_history` often contains `mysql -u root -pPassword123`.
- **PowerShell**: `(Get-PSReadlineOption).HistorySavePath` contains typed commands.
