---
title: Access Token Manipulation
tags: [priv-esc, token-theft, incognito, sid-history, impersonation]
description: Stealing, forging, and manipulating Windows Access Tokens to gain privilege.
date: 2024-01-02
---

# Access Token Manipulation (T1134)

In Windows, your "Identity" is a Token in kernel memory. If I can copy your Token, I become you.

## 1. Token Impersonation / Theft
Requires: **SeDebugPrivilege** (usually present if you are local Admin).

### The Scenario
You are Admin on `WEB-01`. The Domain Admin (`DA_User`) logs in to check logs. Their token is now in memory.

### Technique (Incognito / Mimikatz)
1.  **List Tokens**: Find tokens available for delegation.
2.  **Impersonate**:
    ```bash
    # Meterpreter
    use incognito
    list_tokens -u
    impersonate_token "DOMAIN\\DA_User"
    ```
3.  **Result**: `whoami` -> `DOMAIN\DA_User`.

## 2. Make and Impersonate Token
Creating a token from credentials.
- **Runas**: `runas /user:Administrator /netonly cmd.exe`
  - This creates a token that is valid for *Network* resources but looks like the local user locally.

## 3. SID-History Injection
Used in **Golden Tickets**.
- The `SID-History` attribute allows users to retain access when migrating domains.
- **Attack**: Inject the SID of "Enterprise Admins" into the SID-History of a regular user ticket.
- **Result**: You are a regular user, but the Domain Controller treats you as an Enterprise Admin.

## 4. Parent PID Spoofing
(Also Defense Evasion).
- Launching a process with the Token of another process (e.g., `lsass.exe` or `winlogon.exe`) to inherit its system-level privileges.
