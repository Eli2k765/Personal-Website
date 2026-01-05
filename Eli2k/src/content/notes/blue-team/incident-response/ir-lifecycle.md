---
title: Incident Response Lifecycle
tags: [blue-team, ir, picerl, process]
description: The PICERL framework for checking handling incidents.
date: 2024-01-02
---

# IR Lifecycle (PICERL)

The steps every responder dances to.

## 1. Preparation
- **Tools**: EDR deployed, Logs centralized, Jump box ready.
- **People**: Call trees, Shift schedules.
- **Process**: Playbooks written (e.g., "What do we do if the Domain Controller is encrypted?").

## 2. Identification
"Is this weird, or is this malicious?"
- **Triage**: Filtering false positives.
- **Scoping**: "Is it one laptop, or the whole fleet?"

## 3. Containment
- **Short Term**: Disconnect cable, Isolate host via EDR, Reset password.
- **Long Term**: Apply firewall block at perimeter, patch vulnerability.
- *Goal*: Stop the spread. Do not reboot (lose memory evidence) unless necessary.

## 4. Eradication
- Re-imaging the machine (Nuke it from orbit).
- Resetting all credentials (KRBTGT).
- Removing Rootkits/Backdoors.

## 5. Recovery
- Restore from clean backups.
- Monitoring for 24-48 hours to ensure the actor doesn't return (persistence).
- Bringing business services back online.

## 6. Lessons Learned (Post-Mortem)
- "Coverage Analysis": Why didn't we catch this earlier?
- "Process Improvement": Did we have the right phone numbers?
