---
title: User Execution
tags: [execution, social-engineering, macros, lnk]
description: Techniques that rely on specific user actions to execute malicious code.
date: 2024-01-02
---

# User Execution (T1204)

If you can't exploit the machine, exploit the human.

## 1. Malicious Files

### LNK Files (Shortcuts)
A `.lnk` file is a shortcut. You can set the "Target" to a malicious command.
- **Target**: `%COMSPEC% /c powershell.exe -nop -w hidden -c IEX(...)`
- **Icon**: Change icon to `folder.ico` or `pdf.ico`.
- **Behavior**: User double clicks what looks like a PDF, but executes PowerShell.

### Office Macros (VBA)
Embedding Visual Basic code in Excel/Word.
- **AutoOpen()**: Function runs as soon as document opens + "Enable Content" is clicked.
- **VBA Stomping**: Modifying the compiled p-code of the macro to mismatch the VBA source code (confuses analysis tools).

### OneNote (.one)
*Patched recently, but interesting history.*
Embedding an HTA script behind a "Double Click to View Cloud Attachment" image.

## 2. Malicious Links (Browser Exploitation)
Tricking a user into visiting a page that hosts:
- **Browser Exploit**: (Rare/Expensive) Code execution via Chrome 0-day.
- **Drive-by Download**: Auto-downloading a file.
- **User-Assisted Download**: "Your Chrome is out of date. Update Now!" -> downloads `Update.exe` (Malware).

## Strategy
User Execution requires **Social Engineering**.
- **Pretext**: "Urgent Invoice", "HR Salary Update".
- **Timing**: Send at 4:55 PM on Friday (End of week urgency).
