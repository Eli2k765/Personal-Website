---
title: "HTB: Brainstorm"
tags: [htb, binary, medium, windows, bof]
date: 2025-01-01
description: Classic Windows stack-based buffer overflow.
---

# Hack The Box: Brainstorm

**Difficulty**: Medium  
**OS**: Windows

## Reconnaissance
- **Port 9999**: Runs a chat service `chat.exe`.
- **FTP**: Anonymous FTP contains the malicious `chat.exe` and `essfunc.dll`.

## Exploitation
1.  **Fuzzing**: Sending 2000 'A's crashes the app.
2.  **Offset**: Locate EIP offset.
3.  **Bad Chars**: Identify `\x00`.
4.  **Jump Point**: Find `JMP ESP` in `essfunc.dll`.
5.  **Payload**: Generate Shellcode and send.
