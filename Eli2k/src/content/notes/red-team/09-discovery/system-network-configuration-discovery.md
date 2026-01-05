---
title: System Network Configuration Discovery
tags: [discovery, network, ip, route, arp]
description: Identifying network interfaces, routes, and connected neighbors.
date: 2024-01-02
---

# System Network Configuration Discovery (T1016)

Where am I? What subnets can I reach?

## 1. Windows Commands
- **Basic**: `ipconfig /all`
- **Routing Table**: `route print`. (Look for internal subnets like `10.x.x.x` or `172.16.x.x`).
- **Neighbors**: `arp -a`. Shows machines the host has recently talked to.

## 2. Linux Commands
- **Interfaces**: `ip addr` or `ifconfig`.
- **routes**: `ip route`.

## 3. AD Site Discovery
- `nltest /dclist:target.com`
- `dsquery site`
- **Why?**: Different AD sites often imply different physical locations (e.g., "US-East", "London-Office").
