---
title: "LetsDefend: Splunking Endpoint"
tags: [letsdefend, blue-team, splunk, search, hunting]

description: "Using SPL (Search Processing Language) to find lateral movement."
---

# LetsDefend: Splunking Endpoint

**Tool**: Splunk Enterprise.

## 1. Process Parent/Child
We look for `powershell.exe` spawned by `winword.exe` (Macro).
Query:
`index=main Image="*powershell.exe*" ParentImage="*winword.exe*"`
Result: 1 hit. Confirmed Malfile.

## 2. Rare Processes
We use `stats` to find anomalies.
`index=main | stats count by Image | sort count asc`
We see `whoami.exe` ran once. (Recon).

## Conclusion
Splunk turns millions of events into one manageable table.
