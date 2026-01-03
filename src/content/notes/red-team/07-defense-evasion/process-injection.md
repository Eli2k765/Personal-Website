---
title: Process Injection
tags: [defense-evasion, injection, dll-injection, shellcode, hollowing]
description: Running code inside the address space of another process.
date: 2024-01-02
---

# Process Injection (T1055)

The Holy Grail of Evasion. If I live inside `explorer.exe`, I am `explorer.exe`.

## 1. DLL Injection (`CreateRemoteThread`)
The classic method.
1.  **OpenProcess**: Get a handle to target (e.g., Notepad).
2.  **VirtualAllocEx**: Allocate memory in Notepad.
3.  **WriteProcessMemory**: Write the path `C:\evil.dll`.
4.  **CreateRemoteThread**: Call `LoadLibraryA` in Notepad to load that DLL.
- *Detection*: Very High (Sysmon Event ID 8).

## 2. Process Hollowing
1.  Start a legitimate process (`svchost.exe`) in **Suspended Mode**.
2.  Unmap (Hollow out) its memory.
3.  Write your malicious code into its memory.
4.  Resume Thread.
- *Result*: The process looks like `svchost.exe` in Task Manager, but runs your code.

## 3. Thread Execution Hijacking
1.  Suspend a running thread in a target process.
2.  Get Thread Context (CPU registers).
3.  Change `RIP` (Instruction Pointer) to point to your shellcode.
4.  Resume Thread.

## 4. Reflective DLL Injection
Loading a DLL from memory without it ever touching the disk.
- **Manual Mapping**: The DLL handles its own imports and relocations.
