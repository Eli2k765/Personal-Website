---
title: Container and Cloud Execution
tags: [execution, cloud, kubernetes, lambda, serverless]
description: Executing malicious code in containerized (Docker/K8s) or cloud environments (Serverless).
date: 2024-01-02
---

# Container Execution (T1609) / Cloud Execution (T1610)

Running code where there is no OS (Serverless) or where the OS is ephemeral (Containers).

## 1. Kubernetes Execution
- **kubectl exec**: The standard way.
  ```bash
  kubectl exec -it my-pod -- /bin/sh
  ```
- **Sidecar Injection**: Modifying the Deployment YAML to add a secondary container (malicious sidecar) that shares the network/disk of the legitimate container.

## 2. Serverless Execution (AWS Lambda)
- **Persistence**: Backdooring the Lambda function code.
  - Adding a few lines to a Python Lambda that sends `event` data to your C2.
- **Triggering**: Creating a new trigger (e.g., API Gateway) that executes the function when YOU visit a URL.

## 3. ECS / Docker
- **Docker exec**: `docker exec -it container_id /bin/bash`.
- **Scheduled Tasks**: Creating a Kubernetes `CronJob` to run your malware every hour.
