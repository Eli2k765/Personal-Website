---
title: Masquerading
tags: [defense-evasion, rtlo, masquerading, spoofing]
description: Manipulating artifacts to appear legitimate. RTLO, renaming utilities, and fake icons.
date: 2024-01-02
---

# Masquerading (T1036)

Looking like a sheep to hide from the wolf (EDR).

## 1. Rename Legitimate Utilities
Copying `powershell.exe` to `calc.exe` to bypass "Block powershell.exe" rules.
- *Note*: Modern EDR checks the File Hash or OriginalFileName metadata, making this less effective.

## 2. Right-to-Left Override (RTLO)
Using the Unicode character `U+202E` to reverse the string display.
- **Real Name**: `invoice_fdp.exe`
- **Display**: `invoice_exe.pdf`
- **User sees**: A PDF file.
- **OS executes**: An EXE file.

## 3. Masquerade Task or Service
- **Name**: `GoogleUpdateService` (Legit) vs `GoogleUpdateService_` (Malware).
- **Description**: Copy the description from the real service to your malicious service.

## 4. Masquerade File Type
- Hiding a ZIP file inside a JPG (Steganography/Polyglot).
- Changing the Icon of an EXE to a Word Document icon.
