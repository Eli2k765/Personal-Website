---
title: Gather Victim Host Information
tags: [recon, host-info, hardware, software, firmware]
description: Enumerating hardware, software, firmware, and client configurations to tailor attacks.
date: 2024-01-02
---

# Gather Victim Host Information (T1592)

Before delivering a payload, you need to know if it will run. Dropping a Windows binary on a Mac user is a wasted burn.

## 1. Hardware
Identifying the physical devices.
- **Mobile vs Desktop**: User-Agents in email tracking pixels reveal `iPhone` vs `Windows NT`.
- **Infrastructure**: Supply chain photos or job postings often list "Dell Servers" or "Cisco Routers".

## 2. Software
What apps are installed?
- **Metadata**: PDF/Doc metadata often contains `Producer: Microsoft Office 365` or `Adobe Acrobat Pro`.
- **Browser Enumeration**: CSS history sniffing (legacy) or fingerprinting via specialized JS libraries.
- **Job Postings**: "Looking for Expert in CrowdStrike Falcon" -> They use CrowdStrike.

## 3. Firmware
BIOS/UEFI versions.
- **Remote**: Rare to find remotely unless via exposed management interfaces (iDRAC, ILO).
- **Shodan**: `port:623` (IPMI) often leaks firmware versions.

## 4. Client Configurations
- **Security Software**: Does the email gateway strip `.zip` files?
- **Language**: Keyboard layout settings (if you get execution) matter for keylogging.
