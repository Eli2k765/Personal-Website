---
title: Archive Collected Data
tags: [collection, archive, zip, encryption, dlp]
description: Compressing and encrypting data to prepare for exfiltration and bypass DLP.
date: 2024-01-02
---

# Archive Collected Data (T1560)

Don't send 1000 files. Send 1 zip.

## 1. Compression formats
- **Method**: ZIP, 7z, Tar, RAR.
- **Tools**:
  - `7za.exe` (Common, requires dropping binary).
  - `Compress-Archive` (PowerShell, native).
  - `tar -czvf` (Linux).

## 2. Encryption (DLP Evasion)
Data Loss Prevention tools scan for credit card numbers. If you ZIP it with a password, they can't see inside.
- **Command**:
  ```bash
  7za.exe a -p"Malware123!" confidential_data.7z C:\Users\CEO\Documents
  ```

## 3. Segmentation
Splitting large archives to avoid "Large File Upload" alerts.
- **Command**: `split -b 50M data.tar.gz part_`
