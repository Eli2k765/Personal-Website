---
title: "LetsDefend: Threat Hunting with Sysmon"
tags: [letsdefend, blue-team, hunting, sysmon]
date: 2024-01-01
description: Detecting Living off the Land binaries using Event IDs 1, 3, and 11.
---

# LetsDefend: Threat Hunting with Sysmon

**Goal**: Catching what AV misses.

## Key Events
1.  **Event 1 (Process Create)**:
    - Hunt: `Image: certutil.exe` AND `CommandLine: *urlcache*` (Downloading malware).
2.  **Event 3 (Network Connection)**:
    - Hunt: `Image: powershell.exe` connecting to the Internet (Rare for admins, common for attackers).
3.  **Event 11 (File Create)**:
    - Hunt: Dropping executable files in `AppData\Local\Temp`.
