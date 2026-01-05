---
title: "HTB: Brainstorm"
tags: [htb, binary, buffer-overflow, windows, chat]

description: "A classic Windows Stack Buffer Overflow sequence: Fuzzing, Offset, Badchars, EIP Control, Shellcode."
---

# Hack The Box: Brainstorm

**Machine IP**: `10.10.10.17`
**OS**: Windows
**Difficulty**: Medium

Brainstorm is the OSCP prep exam box. It requires a vanilla Buffer Overflow.

## 1. Reconnaissance
Port 9999 (Brainstorm Chat).
We connect via Netcat. It takes a username and message.

## 2. Fuzzing
We send 1000 'A's to the username field. **Crash**.
We use `pattern_create.rb` to find the offset.
**Offset**: 2012 bytes.

## 3. Exploitation
1.  **Badchars**: We test `\x00` (Null byte).
2.  **JMP ESP**: We find a `jmp esp` instruction in a DLL without ASLR.
3.  **Shellcode**: `msfvenom -p windows/shell_reverse_tcp ... -b '\x00'`.
4.  **Payload**: `Padding (2012) + JMP ESP Address + NOP Sled + Shellcode`.

We send the python script.
**Shell**.

## Conclusion
Memory corruption isn't magic; it's math.
