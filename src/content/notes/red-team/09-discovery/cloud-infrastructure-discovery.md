---
title: Cloud Infrastructure Discovery
tags: [discovery, cloud, aws, azure, s3]
description: Enumerating cloud resources, permissions, and storage to map the environment.
date: 2024-01-02
---

# Cloud Infrastructure Discovery (T1580)

Mapping the sky.

## 1. Cloud Storage Discovery (S3 / Blobs)
- **Bucket Enumeration**: Scanning for open buckets (`company-backup`, `company-dev`).
- **Permissions**: Checking if `AuthenticatedUsers` (aka ANY AWS account) has `READ` or `WRITE` access.
- **Tool**: `CloudSploit`, `Prowler`.

## 2. IAM Enumeration (Permissions)
"What can I do?"
- **AWS**: `aws sts get-caller-identity` (Who am I?). `aws iam list-attached-user-policies` (What can I do?).
- **Tool**: `enumerate-iam` (Brute-forces API calls to see what errors/succeeds if `ListPolicies` is blocked).

## 3. Instance Metadata
The most critical cloud discovery technique.
- **AWS**: `curl http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE_NAME`.
- **Result**: Returns temporary AWS Keys for the role attached to the VM.
- **Azure**: Managed Identity endpoint.
