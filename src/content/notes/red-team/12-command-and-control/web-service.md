---
title: Web Service
tags: [c2, dead-drop, github, google-sheets, api]
description: Using legitimate web services (social media, cloud storage) for C2 communication.
date: 2024-01-02
---

# Web Service (T1102)

Dead Drop Resolvers.

## 1. Concept
Instead of connecting to `evil.com`, the malware connects to `google.com`.
- **Logic**:
  1.  Malware checks a specific Google Sheet or GitHub Gist.
  2.  Operator updates the Sheet with a command: `exec: calc.exe`.
  3.  Malware reads it, executes, and writes the output back to the Sheet.

## 2. Benefits
- **Reputation**: Traffic goes to Google/Microsoft/Twitter. Firewalls almost always allow this.
- **Resilience**: Harder to take down `google.com` than `evil.com`.

## 3. Examples
- **GitHub**: Reading commands from `README.md`.
- **Twitter/X**: Reading commands from a bio or tweet.
- **Imgur**: Steganography in posted images.
