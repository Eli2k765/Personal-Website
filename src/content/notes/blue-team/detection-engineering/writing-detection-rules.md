---
title: Writing Detection Rules (Sigma/YARA)
tags: [blue-team, detection-as-code, sigma, yara, snort]
description: Creating portable, shareable detection logic.
date: 2024-01-02
---

# Writing Detection Rules

Detection as Code.

## 1. Sigma (The Standard)
Sigma is "Markdown for SIEM rules". It describes *what* to detect, independent of the SIEM.
- **Format** (YAML):
  ```yaml
  title: Check Remote Debugger Attached to LSASS
  id: 1111-2222-3333-4444
  status: experimental
  description: Detects the use of a remote debugger (like ntsd) attached to the LSASS process to dump credentials.
  logsource:
    category: process_access
    product: windows
  detection:
    selection:
      TargetImage: 'C:\Windows\System32\lsass.exe'
      GrantedAccess: '0x1F0FFF' # All Access
    condition: selection
  falsepositives:
    - Antivirus solutions
  level: critical
  ```
- **Compiler**: Uses `uncoder.io` or `sigmac` to translate this YAML into Splunk SPL (`Input: yaml -> Output: index=sysmon EventCode=10 TargetImage="*lsass.exe" ...`) or Elastic DSL.

## 2. YARA (File Pattern Matching)
Searching for files based on content, not hash.
- **Use Case**: Malware hunting on disk or memory.
- **Rule**:
  ```yara
  rule Mimikatz_Memory {
      strings:
          $s1 = "gentilkiwi" wide
          $s2 = "sekurlsa" wide
      condition:
          any of them
  }
  ```

## 3. Snort/Suricata (Network signatures)
Pattern matching on the wire.
- **Rule**:
  ```snort
  alert tcp $HOME_NET any -> $EXTERNAL_NET 443 (msg:"ET MALWARE Cobalt Strike Beacon"; content:"|00 00 00 00|"; depth:4; sid:1000001;)
  ```
