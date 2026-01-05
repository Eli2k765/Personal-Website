---
title: Stage Capabilities
tags: [resource-dev, staging, seo-poisoning, drive-by]
description: Preparing the infrastructure to deliver the payload.
date: 2024-01-02
---

# Stage Capabilities (T1608)

Setting the trap.

## 1. Upload Malware / Tools
Hosting your payloads.
- **CDN**: Hosting on Discord CDN, OneDrive, or AWS S3. Note: These links eventually get flagged.
- **Compromised Sites**: Hiding `payload.exe` in the `/images/` directory of a hacked WordPress site.

## 2. Install Digital Certificate
Installing your purchased/stolen SSL cert on your C2 domains to look legitimate.
- **LetsEncrypt**: Free, but low trust.
- **OV/EV Certs**: High trust.

## 3. SEO Poisoning
Manipulating search engine results.
- **Goal**: User searches "Download Zoom" -> Your fake site appears #1.
- **Technique**: Buying Google Ads (Malvertising) or keyword stuffing compromised sites.

## 4. Drive-by Target
Preparing a website to exploit browsers.
- **BeEF**: Browser Exploitation Framework.
- **Link Target**: Creating the specific phishing URL with unique identifiers for tracking.
