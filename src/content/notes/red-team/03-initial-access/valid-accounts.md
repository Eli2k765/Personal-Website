---
title: Valid Accounts
tags: [initial-access, password-spray, credentials, cloud]
description: Abusing existing accounts to gain entry. Password spraying, credential stuffing, and cloud identity attacks.
date: 2024-01-02
---

# Valid Accounts (T1078)

Why break the window when you have the key? Using valid accounts is the stealthiest way in. It looks like legitimate user activity.

## 1. Password Spraying
Brute force (trying 1000 passwords for 1 user) locks accounts. Password spraying (trying 1 password for 1000 users) stays under the radar.

### The Logic
1.  **Enumerate Users**: Use OSINT (LinkedIn) to build `users.txt`.
2.  **Pick Passwords**: Season + Year (`Winter2024!`, `Summer2024!`, `Company2024!`).
3.  **Timing**: Wait 60-90 minutes between sprays to avoid "Smart Lockout".

### Tools
- **TrevorSpray** (O365/Azure):
  ```bash
  trevorspray -u emails.txt -p "Winter2024!" --delay 15 --url https://login.microsoft.com
  ```
- **Kerbrute** (Internal/VPN):
  ```bash
  # Validates users AND checks passwords via Kerberos Pre-Auth (No login event logged if failed)
  kerbrute passwordspray -d target.com users.txt "Winter2024!"
  ```

## 2. Cloud Credentials
Cloud accounts (AWS/Azure) often lack MFA on CLI/API endpoints even if the Web UI enforces it.

- **AWS Exposed Keys**: Developers leave `AKIA...` keys in generic `test.py` files.
- **Azure Device Code Phishing**: detailed in Phishing, but leads to a Valid Account session via `Az CLI`.

## 3. Credential Stuffing
Users reuse passwords.
1.  Download a database from a breach (e.g., CoinTracker 2024 breach).
2.  Filter for `@target.com` emails.
3.  Try those exact passwords on the corporate VPN/O365.

## OpSec
- **User-Agent**: Use a standard User-Agent.
- **IP Rotation**: Use FireProx (AWS API Gateway rotation) to hide your source IP.
