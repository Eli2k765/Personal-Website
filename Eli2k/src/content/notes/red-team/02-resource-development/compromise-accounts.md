---
title: Compromise Accounts
tags: [resource-dev, accounts, compromise, cloud, email]
description: Compromising existing accounts (email, cloud, social) to support operations.
date: 2024-01-02
---

# Compromise Accounts (T1586)

Why create a fake account when you can steal a real one? Real accounts have reputation and history.

## 1. Social Media Accounts
- **Use Case**: Phishing via DM (LinkedIn/Twitter). People trust DMs more than email.
- **Method**: Credential stuffing or buying access.

## 2. Email Accounts
- **Business Email Compromise (BEC)**: Taking over a vendor's email to send fake invoices/malware to the target.
- **Trust**: Emails coming from `vendor.com` pass DMARC/SPF checks.

## 3. Cloud Accounts
AWS / Azure / GCP.
- **Resource Hijacking**: Using compromised AWS keys to spin up GPU instances for cracking hashes.
- **Infrastructure**: Hosting your C2 redirectors on a compromised tenant (free hosting + high reputation).
