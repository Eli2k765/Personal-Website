---
title: "HTB: BlackSky"
tags: [htb, cloud, pro-lab, azure, aws]
date: 2025-01-01
description: Enterprise hybrid cloud pivoting between AWS and Azure AD.
---

# Hack The Box: BlackSky (Pro Lab)

**Difficulty**: Pro Lab  
**Scope**: Multi-cloud Enterprise

## Concept
Simulates a corporation with resources in both AWS and Azure.

## Methodology
1.  **Initial Access**: Phishing for Azure AD credentials.
2.  **Azure Enumeration**: `RoadTools` to map the tenant.
3.  **Lateral to AWS**: Found Terraform state files in an Azure Storage Blob containing AWS Keys.
4.  **AWS Persistence**: Creating a backdoor IAM User.
