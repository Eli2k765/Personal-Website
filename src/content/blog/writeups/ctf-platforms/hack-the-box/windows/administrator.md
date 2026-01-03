---
title: "HTB: Administrator"
tags: [htb, windows, medium, lolbins]
date: 2025-01-01
description: Living off the Land and abusing Admin consoles.
---

# Hack The Box: Administrator

**Difficulty**: Medium  
**OS**: Windows

## Concept
Using built-in administration tools against the system.

## Attack Path
1.  Identify exposed Admin Console (e.g., older iDRAC or Management Interface).
2.  Use default credentials.
3.  **LOLBins**: Use the console's "Diagnostic" feature to run `certutil` or `bitsadmin` to download a payload.
