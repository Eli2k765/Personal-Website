---
title: Establish Accounts
tags: [resource-dev, personas, social-engineering, opsec]
description: Creating and aging realistic personas and accounts for social engineering and infrastructure management.
date: 2024-01-02
---

# Establish Accounts (T1585)

Adversaries must establish accounts to access resources or perform social engineering. You cannot just create `hacker@gmail.com` and expect it to work. You need **Personas**.

## 1. Persona Creation
A persona is a fabricated identity used to interact with the target.

### The Lifecycle of a Persona
1.  **Creation**:
    - **Name**: Use a random name generator, but cross-reference ensuring it's common for the region.
    - **Photo**: Use `thispersondoesnotexist.com` (AI-generated faces). *Tip: Verify the eyes and background, AI often glitches there.*
    - **Phone Verification**: Use burner SIMs or services like `SMSPVA` to verify Google/Twitter/LinkedIn accounts. Use Google Voice if possible for persistence.

2.  **Aging (The 90-Day Rule)**:
    - Fresh accounts trigger spam filters.
    - Create the LinkedIn profile 3-6 months before the op.
    - Post generic industry news occasionally.
    - Connect with LIONs (LinkedIn Open Networkers) to build connection count to > 500.

3.  **Digital Footprint**:
    - Build a history. Create a GitHub with some forked repos.
    - Create a Medium blog with one or two AI-generated articles.
    - When the target investigates "John Doe from Recruiter Co", they should find a boring, normal internet presence.

## 2. Infrastructure Accounts
You need accounts to buy domains, SSL certs, and VPS hosting.

- **Payment Methods**:
  - **Prepaid Cards**: Privacy.com (US only) or crypto-funded debit cards.
  - **Crypto**: Bitcoin/Monero for anonymous VPS hosting (e.g., 1984 Hosting, Njalla). *Note: Some providers require ID verification even for crypto.*
- **Separation of Concerns**:
  - Do NOT use your personal email for *anything*.
  - Use a dedicated ProtonMail/Tutanota account for operational purchases.

## 3. Account Types & Use Cases
- **Social Media (LinkedIn/Twitter)**: Reconnaissance and contacting targets for SE.
- **Email (Gmail/Outlook)**: High reputation for phishing. "Freemail" phishing is less effective than domain phishing, but good for "Personal" pretexts (e.g., "sending this from my personal email because work email is bouncing").
- **Cloud (AWS/Azure)**: Required for hosting heavy infrastructure. Needs a credit card.

## OpSec Warnings
- **Browser Fingerprinting**: Use a dedicated VM or Browser Profile (Firefox Containers) for each persona. Do not mix your "Hacker" persona with your "Recruiter" persona in the same browser session.
- **VPN Hygiene**: Ensure your VPN Exit IP matches the persona's claimed location. Don't be "Sarah from London" logging in from a NordVPN node in Panama.
