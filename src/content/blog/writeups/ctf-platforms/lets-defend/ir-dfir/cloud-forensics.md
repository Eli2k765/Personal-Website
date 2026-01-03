---
title: "LetsDefend: Cloud Forensics"
tags: [letsdefend, blue-team, cloud, aws, azure]
date: 2024-01-01
description: Analyzing CloudTrail and Activity Logs for unauthorized access.
---

# LetsDefend: Cloud Forensics

**Scenario**: Compromised IAM Key.

## Investigation
1.  **CloudTrail (AWS)**:
    - Search: `EventName: ConsoleLogin` or `EventName: GetCallerIdentity` (Recon).
    - **Anomaly**: Login from an external IP (Nigeria) on an account usually accessing from US.
2.  **Actions**:
    - Attacker created a new EC2 instance (`RunInstances`) for crypto mining.
3.  **Remediation**: Revoke Keys, Terminate Instances.
