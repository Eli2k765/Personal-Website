---
title: "HTB: Dante"
tags: [htb, pro-lab, pivoting, lateral-movement]
date: 2025-01-01
description: Network pivoting, SOCKS proxying, and lateral movement across subnets.
---

# Hack The Box: Dante (Pro Lab)

**Difficulty**: Pro Lab (Novice)

## Overview
Dante focuses on the concept of pivoting.

## Key Techniques
- **Double Pivoting**: `Attack Box` -> `Public Web` -> `Internal App` -> `DB Server`.
- **ProxyChains**: Routing Nmap and tools through SOCKS tunnels (Chisel/Sshuttle).
- **Lateral Movement**: Pass-the-Hash across different subnets.
