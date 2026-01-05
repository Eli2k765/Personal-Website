---
title: "LetsDefend: Investigate Web Attack"
tags: [letsdefend, blue-team, sqli, xss, access-logs]

description: "Analyzing Apache Access logs to separate scanning noise from successful SQL injection."
---

# LetsDefend: Investigate Web Attack

**Scenario**: Web Server Alert.
**Logs**: `access.log`.

## 1. Noise Filter
We see thousands of requests for `wp-login.php`, `.env`, etc. This is automated scanning.

## 2. The Anomaly
We search for query parameters. `?id=`.
Request: `GET /product.php?id=1'` -> 500 Internal Server Error (SQL Syntax error).
Request: `GET /product.php?id=1' OR 1=1--` -> 200 OK (Success).
The attacker dumped the database.

## 3. Impact
Size of response: 50kb vs normal 2kb.
They exfiltrated data.

## Conclusion
Status codes (200 vs 500) and Response Size are key to differentiating "Scanning" from "Breach".
