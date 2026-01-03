---
title: "HTB: Overflow"
tags: [htb, binary, hard, crypto, rop]
date: 2025-01-01
description: Padding Oracle attacks and ROP chain construction.
---

# Hack The Box: Overflow

**Difficulty**: Hard  
**Category**: Pwn

## Challenge
A binary service with a custom encryption protocol.

## Exploitation
1.  **Crypto**: Identify Padding Oracle vulnerability in the decryption routine. Leaks the session key.
2.  **Buffer Overflow**: The decrypted message is copied to a stack buffer without checking length.
3.  **ROP**: NX is enabled, so we construct a ROP chain to leak `libc` address and call `system('/bin/sh')`.
