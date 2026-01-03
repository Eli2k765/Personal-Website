---
title: "LetsDefend: Splunking the Endpoint"
tags: [letsdefend, blue-team, hunting, splunk, spl]
date: 2024-01-01
description: Using SPL for statistical frequency analysis and C2 detection.
---

# LetsDefend: Splunking the Endpoint

**Querying for Evil.**

## Techniques
1.  **Rare Analysis**:
    ```spl
    index=endpoint | rare limit=10 Image
    ```
    - Finds processes that only ran once (Potential Malware).
2.  **Beacon Detection**:
    - Calculating the time delta between network connections.
    - If `delta` is perfectly consistent (e.g., exactly 60 seconds), it's a C2 beacon.
3.  **Long Tail**:
    - Visualizing the "Least Common" Parent-Child process relationships (`svchost.exe` spawning `cmd.exe`).
