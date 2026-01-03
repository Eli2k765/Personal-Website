---
title: Gather Victim Network Information
tags: [recon, network, subdomains, cloud, dns]
description: "Mapping the attack surface: Subdomain enumeration, Cloud asset discovery, and DNS analysis."
date: 2024-01-02
---

# Gather Victim Network Information (T1590)

Before touching the target's main infrastructure, we need a map. This phase is about finding the "Shadow IT"—the forgotten dev server, the unpatched Jenkins instance, or the Exposed S3 bucket.

## 1. Subdomain Enumeration
Subdomains often host weaker apps than the main `www`.

### Passive Enumeration (No Traffic to Target)
Query public databases instead of the target DNS.
- **Amass**: The heavyweight champion. Uses 50+ sources (VirusTotal, AlienVault, etc.).
  ```bash
  amass enum -passive -d target.com
  ```
- **Subfinder**: Fast, Go-based passive scanner.
  ```bash
  subfinder -d target.com -o subdomains.txt
  ```

### Active Enumeration (Brute Force)
Guessing subdomains using a wordlist. Essential for finding hidden dev environments.
- **ShuffleDNS + MassDNS**:
  ```bash
  # Resolve a list of generated subdomains using public resolvers
  shuffledns -d target.com -w wordlist.txt -r resolvers.txt -o active_subs.txt
  ```
- **Permutation Scanning**: If `dev.target.com` exists, try `dev-api.target.com`, `dev-staging.target.com`.
  **Tool: Altdns**
  ```bash
  altdns -i known_subdomains.txt -o data_output -w words.txt -r -s resolved_permutations.txt
  ```

## 2. Cloud Asset Enumeration
Companies leak assets in AWS/Azure/GCP storage blobs.

### AWS S3 Buckets
Buckets follow naming conventions (`company-backup`, `company-dev`).
- **CloudEnum**: Multi-cloud enumeration tool.
  ```bash
  python3 cloud_enum.py -k target_company
  ```
- **What to look for**:
  - `backup.sql`: Database dumps.
  - `config.js`: API keys/Secrets in frontend code.

### Azure/Microsoft 365
- **MicroBurst**: PowerShell toolkit for Azure recon.
  ```powershell
  # Invoke-EnumerateAzureBlobs -Base target
  ```
- **Email Validation via O365**: Microsoft's login endpoints behave differently for valid vs. invalid emails (though they patch this often, tools like `o365creeper` try to leverage timing/response differences).

## 3. Technology Stack Fingerprinting (Wappalyzer / BuiltWith)
Know what they run before you exploit.
- **Browsers**: Use Wappalyzer extension to see `CMS: WordPress 5.8`, `Server: Nginx 1.18`.
- **Command Line**: `whatweb`.
  ```bash
  whatweb -a 3 https://subdomain.target.com
  ```
- **Goal**:
  - Found `Java Spring Boot`? Check for Spring4Shell.
  - Found `Log4j` vulnerable apps? (Solr, Horizon).
  - Found `WordPress`? Run `wpscan`.

## 4. DNS Analysis
DNS records reveal infrastructure.
- **MX Records**: Identifying the email provider (Proofpoint, O365, GSuite).
  - `mxa-01.us.proofpoint.com`: They have a gateway. Phishing will be hard.
  - `company-com.mail.protection.outlook.com`: Direct O365. Easier.
- **TXT Records**: `v=spf1 include:thirdparty.com`. Reveals they use `thirdparty.com` for email marketing. Can we phish *as* the third party?

## Quick Win Workflow
1.  **Amass** (Passive) -> `subs.txt`
2.  **HttpProbe** (Check which are alive)
    ```bash
    cat subs.txt | httprobe > live_hosts.txt
    ```
3.  **Aquatone / WitnessMe** (Screenshot everything)
    ```bash
    cat live_hosts.txt | aquatone
    ```
4.  **Review Screenshots**: Look for login portals, "Index of /", or default pages (IIS/Apache).
