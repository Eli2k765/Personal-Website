---
title: Endpoint Hardening
tags: [blue-team, endpoint, hardening, edr, applocker]
description: Securing the OS against exploitation using native controls and EDR.
date: 2024-01-02
---

# Endpoint Hardening

The endpoint is the new perimeter.

## 1. Attack Surface Reduction (ASR) Rules
Microsoft Defender ASR rules kill entire classes of attacks without needing signatures. These should be deployed via Group Policy or Intune.

### Critical ASR Rules to Enable (Block Mode)
| Rule Name | GUID | Function |
| :--- | :--- | :--- |
| **Block all Office applications from creating child processes** | `D4F940AB-401B-4EFC-AADC-AD5F3C50688A` | Stops Macro -> CMD/PowerShell chains. |
| **Block executable content from email client and webmail** | `BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550` | Stops users from running .exe from Outlook. |
| **Block credential stealing from LSASS** | `9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2` | Prevents Mimikatz from dumping credentials. |
| **Block persistence through WMI event subscription** | `E6DB77E5-3D12-4CF7-95CE-51053029D048` | Stops fileless persistence mechanisms. |

> [!TIP]
> Always enable ASR rules in **Audit Mode** first for 2-4 weeks to identify legitimate business apps that might trigger false positives.

## 2. Application Control (AppLocker / WDAC)
Whitelisting is the gold standard.

### Sample AppLocker Policy (Gold Standard)
This XML policy allows standard Windows binaries but BLOCKS execution from user-writable directories (like Downloads or AppData).
```xml
<RuleCollection Type="Exe" EnforcementMode="Enabled">
    <!-- Allow Windows System Files -->
    <FilePathRule Id="1" Name="Allow Windows" Action="Allow" User="Everyone" Path="%WINDIR%\*" />
    <FilePathRule Id="2" Name="Allow Program Files" Action="Allow" User="Everyone" Path="%PROGRAMFILES%\*" />
    
    <!-- BLOCK everything else (Implicit Deny) -->
    <!-- This effectively blocks C:\Users\Bob\Downloads\malware.exe because it's not in Windows or Program Files -->
</RuleCollection>
```
- **WDAC (Windows Defender Application Control)**: The successor to AppLocker. More robust (Kernel level), but harder to manage.
- **AppLocker Bypass**: Attackers often abuse "Living off the Land" binaries (LOLBins) like `MSBuild.exe` which are in trusted paths but can execute code. Strict rules must also check **Publisher Signatures**.

## 3. LAPS (Local Administrator Password Solution)
Never re-use local admin passwords.
- **Function**: Automatically randomizes the local `Administrator` password on every machine and stores it securely in Active Directory (only retrievable by IT Admins).
- **Impact**: Kills lateral movement via Pass-the-Hash with local accounts.

## 4. EDR Tuning
Installing EDR is not enough.
- **Piss-poor Tuning**: Default policies often "Alert Only" on blocked processes.
- **Aggressive Tuning**: Set policies to "Block" for High-confidence indicators (e.g., Ransomware behavior, LSASS access).
