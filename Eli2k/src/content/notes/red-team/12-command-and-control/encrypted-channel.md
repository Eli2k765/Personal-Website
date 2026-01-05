---
title: Encrypted Channel
tags: [c2, https, ssl, tls, encryption]
description: Using encrypted channels (HTTPS, DNS over HTTPS) to hide C2 traffic.
date: 2024-01-02
---

# Encrypted Channel (T1573)

Hiding the command `whoami` inside a legitimate TLS stream.

## 1. Web Traffic (HTTPS)
Using SSL/TLS certificates.
- **LetsEncrypt**: Free, but domains are newly registered (Red flag).
- **Domain Categorization**: Buying an expired domain that was "Health" or "Finance" to bypass proxy filters.
- **JA3 Signatures**: Ensure your C2 client (Beacon) uses a standard TLS fingerprint (like Chrome) and not a unique one.

## 2. DNS Tunneling
Encoding data in DNS queries.
- **Exfil**: `A` Record query for `[base64-data].evil.com`.
- **Command**: `TXT` Record response from `evil.com`.
- **Pros**: DNS is almost never blocked.
- **Cons**: Very slow and noisy (volume).

## 3. Custom Encryption
Encrypting the payload *inside* the HTTP body (e.g., AES) so even if SSL is broken (Man-in-the-Middle), the blue team sees garbage.
