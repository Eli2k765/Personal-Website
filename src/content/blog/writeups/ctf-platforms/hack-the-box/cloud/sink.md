---
title: "HTB: Sink"
tags: [htb, cloud, hard, request-smuggling, imds]
date: 2024-01-01
description: HTTP Request Smuggling leading to Cloud Metadata abuse.
---

# Hack The Box: Sink

**Difficulty**: Hard  
**OS**: Linux

## Concept
Attacking the Cloud Metadata Service (IMDS).

## Attack Path
1.  **Request Smuggling**: Identify desync between Frontend (HAProxy) and Backend (Gunicorn).
2.  **Smuggle**: Smuggle a request to `http://169.254.169.254/latest/meta-data/iam/security-credentials/`.
3.  **Extract**: Retrieve AWS Access Keys.
