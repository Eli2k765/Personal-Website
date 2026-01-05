---
title: "HTB: Sauna"
tags: [htb, windows, medium, asreproast, bloodhound, secrets, dcsync]

description: "Exploiting username enumeration, ASREPRoasting, and extracting plain text credentials for lateral movement."
---

# Hack The Box: Sauna

**Machine IP**: `10.10.10.175`
**OS**: Windows
**Difficulty**: Medium

Sauna is another pure AD box.

## 1. Reconnaissance
We enumerate usernames from the website about page (Fergus, Shaun, Hugo).
We create a wordlist: `fsmith`, `fergus.smith`, etc.

## 2. Exploitation (ASREPRoast)
We check if any user has "Roastable" settings (Pre-Auth Disabled).
```bash
GetNPUsers.py sauna.htb/ -usersfile users.txt -format hashcat -outputfile hashes
```
**Hit**: `fsmith`.
We crack the hash: `Thestroke23`.

## 3. Lateral Movement
We login as `fsmith`.
We run **WinPEAS** or **CreateDump** to find secrets.
We find explicit credentials for `svc_loanmgr` in the registry (`Autologon` configuration).
Password: `Moneymakestheworldgoround!`

## 4. Privilege Escalation (DCSync)
`svc_loanmgr` is a member of...?
We check Bloodhound.
It's not explicitly Admin. But wait, `Mimikatz` -> `lsadump::secrets`.
Or, we check for **DCSync** rights again via Bloodhound.
Often, service accounts for financial apps have elevated rights.
We DCSync the Administrator hash.

## Conclusion
A solid workout in AD enumeration techniques.
