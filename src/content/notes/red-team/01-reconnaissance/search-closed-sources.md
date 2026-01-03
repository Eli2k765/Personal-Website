---
title: Search Closed Sources
tags: [recon, threat-intel, dark-web, purchase-data]
description: Leveraging paid or private datasets to gather intelligence.
date: 2024-01-02
---

# Search Closed Sources (T1597)

Not everything is on Google. Some data must be bought.

## 1. Threat Intel Vendors
Services like Recorded Future, Mandiant, or Flashpoint.
- They scan the dark web for mentions of your target domain.

## 2. Purchase Technical Data
- **Passive DNS History**: Farsight Security / DomainTools. Shows what IP `vpn.target.com` resolved to 5 years ago.
- **Netflow Data**: Some grey-market vendors sell ISP-level traffic data.

## 3. Dark Web Marketplaces
- **Initial Access Brokers**: Selling pre-compromised RDP/VPN credentials.
- **Stealer Logs**: Buying "logs" from RedLine/Raccoon stealer that contain valid cookies for the target.
