---
title: Scheduled Task/Job
tags: [persistence, scheduled-tasks, cron, systemd]
description: Persistence via Windows Task Scheduler, Linux Cron, and Systemd timers.
date: 2024-01-02
---

# Scheduled Task/Job (T1053)

Running malicious code on a specific schedule (e.g., every day at 9am) or event (system boot).

## 1. Windows Task Scheduler
The most common Windows persistence.

### Command Line (`schtasks`)
```bash
# Create a task named "OneDrive Update" that runs executable every boot
schtasks /create /tn "OneDrive Update" /tr "C:\Users\Public\malware.exe" /sc onstart /ru SYSTEM
```
- **/ru SYSTEM**: Runs as highest privilege (if you have admin).
- **/sc onidle**: Runs when user goes idle (stealthy).

### COM Handler Hijacking (Advanced)
Some Tasks don't execute a binary; they call a COM Object.
1.  Find a Task interacting with a COM CLSID.
2.  Overwrite that CLSID in the Registry to point to `malware.dll`.
3.  When the Task wakes up, it loads your DLL.

## 2. Linux Cron
User-level and System-level scheduling.

### Crontab
```bash
# Edit current user's cron
crontab -e

# Add line: Run every hour
0 * * * * /tmp/.hidden/miner.sh
```

### Systemd Timers
More modern than cron. Harder to spot if you don't look in `/etc/systemd/system`.
1.  **Service Unit**: `evil.service` (Defines what to run).
2.  **Timer Unit**: `evil.timer` (Defines when to run).
3.  **Enable**: `systemctl enable --now evil.timer`.

## OpSec
- **Blend In**: Name your task `EdgeUpdate` or `GoogleUpdater`. Never `Hacked`.
- **Hide**: Windows allows "Hidden" tasks that don't show up in the basic GUI list without checking "Show Hidden Tasks".
