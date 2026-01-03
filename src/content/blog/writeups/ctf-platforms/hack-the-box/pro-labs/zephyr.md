---
title: "HTB: Zephyr"
tags: [htb, pro-lab, red-team, c2, opsec]
date: 2025-01-01
description: Advanced Red Teaming simulation focusing on Evasion, C2, and OpSec.
---

# Hack The Box: Zephyr (Pro Lab)

**Difficulty**: Pro Lab (Intermediate)

## Overview
Zephyr requires "low and slow" operations.

## Key Techniques
- **C2 Frameworks**: Using Cobalt Strike (or Sliver) with Malleable C2 profiles to blend in with HTTP traffic.
- **Evasion**: Bypassing Defender using custom loaders.
- **BloodHound**: Heavy usage of ACL analysis to find obscure paths to Domain Admin.
