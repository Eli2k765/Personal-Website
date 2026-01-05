---
title: "HTB: Netmon"
tags: [htb, windows, easy, prtg, config-leak, ftp]

description: "Exploiting PRTG Network Monitor default credentials and config file leakage."
---

# Hack The Box: Netmon

**Machine IP**: `10.10.10.152`
**OS**: Windows
**Difficulty**: Easy

Netmon runs **PRTG Network Monitor**, a distinctively ugly but common monitoring tool.

## 1. Reconnaissance
*   **21 (FTP)**: Anonymous Allowed.
*   **80 (HTTP)**: PRTG Login.

Checking FTP, we see the entire `C:\` drive (or at least `C:\Users\Public`). This is bad.
We navigate to:
`C:\ProgramData\Paessler\PRTG Network Monitor\PRTG Configuration.dat`.

## 2. Exploitation (Config Leak)
We download the `.dat` file. It's an XML file.
We search for "password".
We find:
```xml
<dbpassword>
  <flags>
    <encrypted/>
  </flags>
  <htm>
    PrTg@dmin2018
  </htm>
</dbpassword>
```
We try this on the web login. Failed.
We increment the year: `PrTg@dmin2019`. **Success**.

## 3. Privilege Escalation (RCE)
PRTG allows "Notifications" that run scripts.
1.  Go to Setup -> Account Settings -> Notifications.
2.  Add a new notification: "Execute Program".
3.  Select a script. (But we can't upload scripts via web?).
4.  Wait, we have **FTP** access.
    Upload `evil.bat` (`net user hacker P@ssword123 /add && net localgroup administrators hacker /add`) to `C:\ProgramData\Paessler\PRTG Network Monitor\Notifications\Exe`.
5.  Select `evil.bat` in the web UI. Test the notification.
6.  User created. Login via SMB/Psexec.

## Conclusion
Credential reuse + Directory Traversal/Backup access = Game Over.
