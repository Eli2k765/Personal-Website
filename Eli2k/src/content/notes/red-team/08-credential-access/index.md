---
title: "8. Credential Access"
tags: [red-team, mitre, credential-access]
description: The adversary is trying to steal account names and passwords.
date: 2024-01-02
---

# Credential Access (TA0006)

Credential Access consists of techniques for stealing credentials like account names and passwords. Techniques used to get credentials include keylogging or credential dumping. Using legitimate credentials can give adversaries access to systems, make them harder to detect, and provide the opportunity to create more accounts to help achieve their goals.

## Strategy
- **Dump**: Pull hashes from memory/disk.
- **Sniff**: Catch hashes off the wire (LLMNR Poisoning).
- **Find**: Look for 'password.txt' on the desktop.
