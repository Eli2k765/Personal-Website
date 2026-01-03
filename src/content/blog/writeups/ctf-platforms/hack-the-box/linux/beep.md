---
title: "HTB: Beep"
tags: [htb, linux, easy, elastix, voip, lfi]
date: 2024-01-01
description: Exploiting an Elastix PBX system using LFI and Shellshock.
---

# Hack The Box: Beep

**Difficulty**: Easy  
**OS**: Linux  

## Reconnaissance
Huge attack surface (Elastix VoIP).
- **LFI**: `/vtigercrm/graph.php?current_language=../../../../../../../etc/amportal.conf%00&module=Accounts&action=Import`
- **Result**: `amportal.conf` reveals cleartext passwords for `admin` and `root`.

## Exploitation
- **SSH**: The gathered password works for SSH as root.
- **Shellshock**: The `User-Agent` vector also works on the `/cgi-bin/` endpoints exposed.
