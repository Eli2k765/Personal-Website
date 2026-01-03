---
title: "HTB: Stacked"
tags: [htb, cloud, insane, lambda, serverless]
date: 2024-01-01
description: Exploiting Serverless functions (AWS Lambda) and escaping containers.
---

# Hack The Box: Stacked

**Difficulty**: Insane  
**OS**: Linux

## Reconnaissance
- Web app triggers Lambda functions via API Gateway.

## Exploitation
- **Event Injection**: Injecting malicious JSON into the Lambda event handler.
- **Cold Starts**: Forcing a new execution environment to leak environment variables.
- **Breakout**: Exploiting the Lambda runtime to access the underlying EC2/Firecracker host.
