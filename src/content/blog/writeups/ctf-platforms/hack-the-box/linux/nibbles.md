---
title: "HTB: Nibbles"
tags: [htb, linux, easy, cve, cms, file-upload]
date: 2024-01-01
description: Exploiting the Nibbleblog CMS via authorized file upload and misconfigured permissions.
---

# Hack The Box: Nibbles

**Difficulty**: Easy  
**OS**: Linux  

## Reconnaissance
- Web source contains comment: `/nibbleblog/`.
- Admin panel at `/nibbleblog/admin.php`.
- **Guessing**: `admin:nibbles` works.

## Exploitation (CVE-2015-6967)
Nibbleblog 4.0.3 allows authenticated users to upload plugins.
- **My Image Plugin**: Upload a PHP shell as an image plugin.
- **Trigger**: Access `/nibbleblog/content/private/plugins/my_image/image.php`.

## Privilege Escalation
- `sudo -l`: User `nibbler` can run `/home/nibbler/personal/stuff/monitor.sh` as root.
- The file allows writing.
- **Attack**: Append a reverse shell to `monitor.sh` and run it with `sudo`.
