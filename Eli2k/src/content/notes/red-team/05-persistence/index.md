---
title: "5. Persistence"
tags: [red-team, mitre, persistence]
description: The adversary is trying to maintain their foothold.
date: 2024-01-02
---

# Persistence (TA0003)

Persistence consists of techniques that adversaries use to keep access to systems across restarts, changed credentials, and other interruptions that could cut off their access. Techniques used for persistence include any access, action, or configuration changes that let them maintain their foothold on systems, such as replacing or hijacking legitimate code or adding startup code.

## Techniques Overview
- **Scheduled Task/Job**: Running malware on a timer or reboot.
- **Boot or Logon Autostart Execution**: Registry Run keys, Startup folders.
- **Create Account**: Adding a backup local admin user.
- **Office Application Startup**: Backdooring Word templates (`Normal.dotm`).

## Strategy
- **Redundancy**: Never rely on just one persistence method. If the SOC finds your Run Key, you want your Scheduled Task to survive.
- **User-Level vs Admin-Level**:
  - **User**: `HKCU` Run keys, Scheduled Tasks (User context). Easier to setup, dies if user is deleted.
  - **Admin**: Services, `HKLM` Run keys. Harder to detect, requires privileges.
