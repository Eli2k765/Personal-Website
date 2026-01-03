---
title: Exfiltration Over C2 Channel
tags: [exfiltration, c2, https, encoding, dlp]
description: Stealing data by sending it through the existing Command and Control channel.
date: 2024-01-02
---

# Exfiltration Over C2 Channel (T1041)

Using the tunnel you already built.

## 1. Request Body / Response
Sending data as `POST` requests.
- **DLP Risk**: Firewalls inspect POST bodies.
- **Evasion**: Encrypt the data *before* embedding it in the HTTP Request. `AES(Data) -> Base64 -> HTTP POST`.

## 2. Cookies and Headers
Hiding data in HTTP Headers.
- **Cookie**: `SessionID=...[encrypted_data]...`
- **User-Agent**: `Mozilla/5.0 ... [encrypted_data]`
- **Limit**: Headers have size limits (usually ~8KB). Good for small secrets (keys), bad for 1GB databases.

## 3. Timing (Jitter)
- Do not send 1GB in one second.
- **Chunking**: Send 10KB chunks every 30 seconds.
