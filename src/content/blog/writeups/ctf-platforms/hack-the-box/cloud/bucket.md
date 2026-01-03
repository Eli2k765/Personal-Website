---
title: "HTB: Bucket"
tags: [htb, cloud, medium, aws, s3]
date: 2024-01-01
description: Enumerating AWS S3 buckets and uploading shells.
---

# Hack The Box: Bucket

**Difficulty**: Medium  
**OS**: Linux (Cloud)

## Reconnaissance
- Hostname implies AWS usage.
- **S3 Fuzzing**: Fuzzing for bucket names (`bucket.htb`, `s3.bucket.htb`).

## Exploitation
- **Public Bucket**: Found a bucket with write access.
- **Upload**: Uploading a PHP shell into the bucket.
- **Sync**: The S3 bucket syncs to the local Apache webroot on a timer.
- **Execution**: Wait for sync, then browse to the shell.
