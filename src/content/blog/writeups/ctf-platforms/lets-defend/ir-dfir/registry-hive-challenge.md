---
title: "LetsDefend: RegistryHive Challenge"
tags: [letsdefend, blue-team, forensics, registry]
date: 2024-01-01
description: Dead-box forensics on SAM/SYSTEM hives using RegRipper.
---

# LetsDefend: RegistryHive Challenge

**Task**: Extract info from provided Hive files.

## Analysis
1.  **Tools**: `RegRipper`, `Registry Explorer`.
2.  **SAM Hive**: Extracted Usernames (`Administrator`, `Guest`, `Hacker`). Found Last Login times.
3.  **SYSTEM Hive**: Identified Current Control Set and Operating System version (Build Number).
4.  **SOFTWARE Hive**: List of installed applications (`7zip`, `Wireshark`).
