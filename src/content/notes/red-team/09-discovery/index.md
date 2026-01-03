---
title: Discovery
tags: [red-team, mitre, discovery]
description: The adversary is trying to figure out your environment.
date: 2024-01-02
---

# Discovery (TA0007)

Discovery consists of techniques an adversary may use to gain knowledge about the system and internal network. These techniques help adversaries observe the environment and orient themselves before deciding how to act.

## Strategy
- **Low and Slow**: Running `nmap` across the whole subnet will set off alarms.
- **Native Tools**: Use `net.exe`, `nltest.exe`, and PowerShell instead of dropping binary scanners.
