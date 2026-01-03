---
title: Active Scanning
tags: [recon, scanning, nmap, masscan, nuclei, vulnerability-scanning]
description: Probing victim infrastructure via network traffic to identify hosts, services, and vulnerabilities.
date: 2024-01-02
---

# Active Scanning (T1595)

Touching the target's wire. This is the loudest form of reconnaissance.

## 1. Port Scanning (Discovery)
Finding open doors.

### Nmap (The Gold Standard)
- **Scanning Types**:
  - `-sS` (SYN Scan): "Half-open". Faster, slightly stealthier.
  - `-sT` (Connect Scan): Completes the TCP handshake.
  - `-sU` (UDP Scan): Slow, but crucial for VPNs (IKE/500) and DNS (53).
- **Stealth / Evasion**:
  - `-T2`: Slow down timing to avoid rate-limits.
  - `--source-port 53`: Mimic DNS traffic.
  - `-f`: Fragment packets (Bypassing older firewalls).
  ```bash
  nmap -sS -p- -T4 -v -oA nmap_full target.com
  ```

### Masscan (Internet Scale)
Nmap is too slow for Class B (`/16`) ranges.
- **Speed**: Masscan sends raw packets. Can scan the entire internet in minutes.
  ```bash
  masscan -p80,443 10.0.0.0/8 --rate=10000
  ```

## 2. Vulnerability Scanning
Finding the weak spots.

### Nuclei (Template Based)
The modern standard.
- **Concept**: YAML templates that describe a vuln (Request) and the match (Response).
- **Usage**:
  ```bash
  nuclei -l urls.txt -t cves/ -o vulnerable.txt
  ```
- **Custom Templates**: Writing your own template to check for a specific header or file path.

### Nessus / Burp Suite Pro
- **Nessus**: Heavy, noisy, comprehensive. Good for compliance.
- **Burp**: Application layer scanning.

## 3. CMS / Technology Scanning
- **Wappalyzer**: Passive tech detection.
- **WPScan**: Active WordPress enumeration. `wpscan --url site.com --enumerate u,p`.
