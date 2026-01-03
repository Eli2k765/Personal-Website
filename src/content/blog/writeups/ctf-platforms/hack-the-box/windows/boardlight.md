---
title: "HTB: BoardLight"
tags: [htb, windows, medium, vhost, hybrid]
date: 2025-01-01
description: Hybrid AD/Web attacks involving aggressive VHost enumeration.
---

# Hack The Box: BoardLight

**Difficulty**: Medium  
**OS**: Linux/Windows Hybrid

## Reconnaissance
- **VHost**: Fuzzing `Host` headers reveals `crm.boardlight.htb`.

## Exploitation
- **Dolibarr CRM**: Vulnerable to PHP Code Injection (CVE-2023-xxxx).
- **Pivot**: The web server has credentials for the internal AD network.
- **Lateral Movement**: SOCKS proxy into the internal network.
