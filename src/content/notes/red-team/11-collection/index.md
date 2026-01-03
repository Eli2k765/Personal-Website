---
title: Collection
tags: [red-team, mitre, collection]
description: The adversary is trying to gather data of interest to their goal.
date: 2024-01-02
---

# Collection (TA0009)

Collection consists of techniques adversaries use to gather information and the sources information is collected from that are relevant to following through on the adversary's objectives. Frequently, the next goal after collecting data is to steal (exfiltrate) it.

## Strategy
- **Targeted**: Find sensitive files (`.docx`, `.pdf`, `web.config`).
- **Automated**: Keylogging credentials as users type.
- **Staging**: Moving data to a central hidden folder before exfiltration.
