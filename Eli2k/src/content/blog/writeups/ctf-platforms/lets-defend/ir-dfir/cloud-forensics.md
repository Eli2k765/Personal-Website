---
title: "LetsDefend: Cloud Forensics"
tags: [letsdefend, blue-team, aws, cloudtrail, json]

description: "Investigating a compromised AWS account using CloudTrail logs."
---

# LetsDefend: Cloud Forensics

**Scenario**: Unusual activity detected in AWS Console.
**Artifacts**: CloudTrail JSON logs.

## 1. Analysis
We filter for `ConsoleLogin`.
We see a login from a suspicious IP (Russia) using the `admin` user.
UserAgent: `Kali Linux`. (Subtle!).

## 2. Impact Analysis
What did they do?
Filter for `RunInstances`.
They spun up 10 massive GPU instances (`p3.16xlarge`).
Purpose: Crypto Mining.

## 3. Remediation
1.  Revoke IAM Keys.
2.  Terminate instances.
3.  Enable MFA.
