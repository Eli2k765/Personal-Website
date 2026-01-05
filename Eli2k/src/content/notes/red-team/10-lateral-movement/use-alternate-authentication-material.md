---
title: Use Alternate Authentication Material
tags: [lateral-movement, pth, ptt, kerberos, ntlm]
description: Authenticating to remote systems using hashes or tickets instead of plaintext passwords.
date: 2024-01-02
---

# Use Alternate Authentication Material (T1550)

You captured a hash. You can't crack it. Now what?

## 1. Pass the Hash (PtH)
Use the NTLM hash directly to authenticate via NTLM protocol.
- **Requirement**: Target must accept NTLM.
- **Tool**: Mimikatz or Impacket.
  ```bash
  sekurlsa::pth /user:Administrator /domain:target /ntlm:HASH /run:cmd.exe
  ```

## 2. Pass the Ticket (PtT)
Using a Kerberos Ticket (TGT or TGS) rooted from `lsass`.
- **Scenario**: You compromised a machine where a Domain Admin is logged in.
- **Action**: Export their TGT. Inject it into your session.
  ```bash
  kerberos::ptt ticket.kirbi
  ```

## 3. Overpass the Hash
Using the NTLM hash to *request* a Kerberos Ticket (TGT) from the KDC.
- Turns a Hash into a Ticket.
- Useful when NTLM is disabled on the network but Kerberos is allowed.
