---
title: "LetsDefend: Investigate Web Attack"
tags: [letsdefend, blue-team, sqli, logs]
date: 2024-01-01
description: Parsing access logs for SQL Injection and Command Injection.
---

# LetsDefend: Investigate Web Attack

**Scenario**: WAF detected anomalies.

## Log Analysis
1.  **SQLi**:
    - Patterns: `UNION SELECT`, `' OR 1=1`.
    - **Status Code**: 200 OK (Success?). 500 Error (Failed?).
2.  **Command Injection**:
    - Pattern: `ip=127.0.0.1; cat /etc/passwd`.
    - **Decoder**: Validating Base64 encoded payloads in the URI.
3.  **Remediation**: Block IP and patch `input validation`.
