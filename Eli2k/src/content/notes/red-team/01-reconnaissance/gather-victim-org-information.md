---
title: Gather Victim Org Information
tags: [recon, org-info, business, physical, roles]
description: Understanding the target's business tempo, physical locations, and key roles.
date: 2024-01-02
---

# Gather Victim Org Information (T1591)

Understanding the human and business logic of the target.

## 1. Determine Physical Locations
- **Google Maps**: Satellite view for physical entry (cameras, gates).
- **Exif Data**: Photos posted by employees on Twitter/Instagram often contain GPS coordinates.

## 2. Business Relationships
Who do they trust?
- **Vendors**: "We are proud partners of XYZ Corp".
- **Attack Vector**: Supply Chain Phishing. Send an invoice pretending to be "XYZ Corp".

## 3. Identify Business Tempo
When are they awake?
- **Email Analysis**: If you receive replies only between 9 AM - 5 PM EST, don't launch a loud attack at 2 PM EST. Launch at 2 AM.
- **Commit History**: Check GitHub commit timestamps.

## 4. Identify Roles
- **Admins**: Who holds the keys? (Found via LinkedIn "Systems Administrator").
- **Financial**: Who approves wire transfers? (CFO, Controller).
