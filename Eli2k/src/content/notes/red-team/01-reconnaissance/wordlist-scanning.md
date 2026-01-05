---
title: Wordlist Scanning
tags: [recon, brute-force, web, fuzzing, gobuster]
description: Using wordlists to brute-force hidden directories, files, and subdomains.
date: 2024-01-02
---

# Wordlist Scanning (T1595)

Finding what isn't linked.

## 1. Directory Brute-Forcing
Web servers often have folders like `/admin`, `/backup`, or `/v1` that aren't linked in the homepage.
- **Tools**: `Gobuster`, `Feroxbuster`, `Dirbuster`.
- **Command**:
  ```bash
  feroxbuster -u https://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
  ```
- **Extensions**: Always check for specific files extensions (`-x php,zip,bak,sql`). Finding `database.sql.bak` is a jackpot.

## 2. DNS Subdomain Brute-Forcing
Public DNS records (Passive DNS) miss subdomains that haven't been queried recently.
- **Tool**: `ffuf` or `amass`.
- **Logic**: Guessing `dev.target.com`, `staging.target.com`, `vpn.target.com`.
  ```bash
  ffuf -w subdomains.txt -u https://TARGET.target.com
  ```

## 3. Virtual Host Discovery
Sometimes `dev.target.com` resolves to the same IP as `target.com`, but the web server only responds if the `Host` header is correct.
- **Attack**: Fuzzing the `Host` header.
