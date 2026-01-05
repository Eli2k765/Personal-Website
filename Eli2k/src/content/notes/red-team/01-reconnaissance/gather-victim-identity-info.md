---
title: Gather Victim Identity Information
tags: [recon, osint, social-engineering, emails, creds]
description: Advanced tradecraft for harvesting email addresses, employee profiles, and credentials to build high-fidelity targets.
date: 2024-01-02
---

# Gather Victim Identity Information (T1589)

Before launching a phishing campaign or password spray, you need accurate targets. "Spray and Pray" is noisy and gets you caught. This phase focuses on building a **High-Fidelity Target List** of real employees, their roles, and their likely email formats.

## 1. Email Format Discovery
First, determine the corporate email pattern (e.g., `firstname.lastname@company.com` vs `f.lastname@company.com`).

### Tools
- **Hunter.io**: The industry standard. Even the free tier gives you the pattern and a few valid emails.
- **Phonebook.cz**: Aggressive scraping of emails.
- **Clearbit Connect**: Browser extension to find emails associated with domains.

### Manual Validation
If you have a suspected email, validators like `mailtester.com` or simple SMTP interactions (VRFY/RCPT TO) can confirm existence without sending mail. *Warning: Frequent RCPT TO checks can be logged and blocked.*

## 2. Employee Harvesting (LinkedIn OSINT)
LinkedIn is the gold mine for Red Teamers. We want to identify specific roles:
- **High Value Targets (Whaling)**: C-Suite, Finance Directors (Wire fraud scenarios).
- **IT/DevOps**: Have admin access, but are more paranoid.
- **Sales/HR**: Accustomed to opening attachments from strangers. **Primary Targets.**

### Automated Harvesting: CrossLinked
[CrossLinked](https://github.com/m8r0wn/CrossLinked) scrapes LinkedIn via search engines (Google/Bing) to avoid detecting your bot on LinkedIn directly.

```bash
# Scrape employees for 'Target Company' in format {first}.{last}@target.com
python3 crosslinked.py -f '{first}.{last}@target.com' -t 'Target Company'
```

### Manual Dorking
Use Google Dorks to find profiles without tools:
```text
site:linkedin.com/in/ "Target Company" "HR Manager"
site:linkedin.com/in/ "Target Company" "IT Administrator"
```

## 3. Credential Breach Lookup
Users reuse passwords. If `jane.doe@target.com` used `Summer2023!` on LinkedIn in 2012, she might use `Winter2024!` on the corporate VPN today.

### DeHashed / IntelX
These services (paid) index billions of leaked credentials.
1.  Search for `@target.com`.
2.  Export all found plaintext passwords.
3.  **Analysis**: Look for patterns.
    - `Company123!`: Weak policy.
    - `F1rstname!`: Personalized.
    - Hash types: NTLM hashes can be cracked; Bcrypt takes longer.

### WeLeakInfo (Historical)
*Note: Many such sites are seized. Stick to legitimate intel providers or local copies of breaches (Collection #1-5, RockYou2021).*

## 4. Advanced: Metadata Analysis (FOCA)
Download public documents (PDFs, DOCX) from the company website. Metadata often contains:
- **Usernames**: `author: jsmith` -> Login format confirmed.
- **Software Version**: `Microsoft Office 365` -> Phishing lur context.
- **Printer Paths**: Internal naming conventions (`\\CORP-PRN-01\`).

**Tool: FOCA (Fingerprinting Organizations with Collected Archives)**
1.  Point FOCA at `www.target.com`.
2.  It spiders for `.pdf`, `.doc`, `.xls`.
3.  Extracts metadata and builds a network map of internal users/servers.

## OpSec Tips
- **Sock Puppets**: NEVER view LinkedIn profiles from your personal account. They will see "John Smith viewed your profile". Create fake, realistic personas aged over months.
- **Traffic Hygiene**: Use residential proxies for scraping. Datacenter IPs (AWS/DigitalOcean) are blocked by LinkedIn/Google instantly.
