---
title: Data Encrypted for Impact
tags: [impact, ransomware, encryption, aes, rsa]
description: Encrypting data to prevent access, typically for extortion (Ransomware).
date: 2024-01-02
---

# Data Encrypted for Impact (T1486)

Ransomware.

## 1. The Method (Hybrid Encryption)
You don't encrypt a 50GB file with RSA (too slow). You don't encrypt it with a hardcoded AES key (too easy to recover).
1.  **Generate** a random AES key in memory.
2.  **Encrypt** the file with AES.
3.  **Encrypt** the AES key with the Attacker's Public RSA Key.
4.  **Save** the Encrypted Key to the file header.
5.  **Destroy** the AES key in memory.

## 2. Speed (Intermittent Encryption)
To outrun detection, modern ransomware only encrypts parts of the file.
- **Header**: First 1MB (Breaks file format).
- **Stripes**: Every 16th block.

## 3. Targeting
- **Prioritize**: Network Shares (`\\FileServer`), Databases (`.sql`, `.mdf`), Backups (`.bak`).
- **Avoid**: `C:\Windows`. If the OS dies, they can't pay the ransom.
