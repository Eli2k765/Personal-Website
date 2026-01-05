---
title: Search Open Websites/Domains
tags: [recon, osint, social-media, github, search-engines]
description: Scouring the surface web, social media, and code repositories for exposed secrets and intel.
date: 2024-01-02
---

# Search Open Websites/Domains (T1593)

## 1. Social Media
- **LinkedIn**: Employee roles and tech stack.
- **Twitter/X**: Engineers complaining about "Azure outages" confirms they use Azure.
- **Instagram**: Photos of employee badges (cloning risk).

## 2. Search Engines
- **Google Dorking**:
  - `site:target.com filetype:pdf "confidential"`
  - `site:target.com "login"`
  - `site:pastebin.com "target.com"`

## 3. Code Repositories
GitHub / GitLab / Bitbucket.
- **Secrets**: API Keys, AWS Access Keys hardcoded in `config.py`.
- **Infrastructure**: Terraform files revealing internal IP ranges.
- **Tool**: `gitrob` or `trufflehog` to scan org repositories.

## 4. Search Victim-Owned Websites
- **Robots.txt**: Often lists sensitive directories (`/admin`, `/backup`) that they want to hide from Google.
- **Sitemap.xml**: Map of the entire site structure.
