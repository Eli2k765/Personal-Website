---
title: Browser Extensions
tags: [persistence, browser, chrome, edge, extensions]
description: Abusing browser extensions to maintain persistence and steal data.
date: 2024-01-02
---

# Browser Extensions (T1176)

Living in the browser.

## 1. The Threat
If you control a user's browser extension, you see **everything** they see. Keylogging, stealing cookies, capturing 2FA codes from web pages.
- **Persistence**: Extensions sync across devices if the user is signed into Chrome/Edge. Infect one laptop -> Infect them all.

## 2. Malicious Extension
- **Manifest V3**: Google's new standard limits some capabilities, but stealing cookies and history is still easy.
- **Permissions**: `permissions: ["tabs", "http://*/*", "https://*/*"]`.
- **Background Script**: Runs persistently even if no tabs are open (as long as browser is open).

## 3. Sideloading (Developer Mode)
1.  Enable "Developer Mode" in `chrome://extensions`.
2.  "Load Unpacked" pointing to your folder.
3.  **Registry Persistence**: You can force-install an extension via Registry keys (`HKLM\Software\Policies\Google\Chrome\ExtensionInstallForcelist`) to prevent removal.
