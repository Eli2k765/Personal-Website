---
title: "HTB: Overflow"
tags: [htb, binary, rop, linux, nx, aslr]

description: "Bypassing NX (No Execute) bit using Return Oriented Programming (ROP)."
---

# Hack The Box: Overflow

**Machine IP**: `10.10.11.x`
**OS**: Linux
**Difficulty**: Hard

Overflow introduces modern protections: **NX** (No Execute). We can't just run shellcode on the stack.

## 1. Analysis
We download the binary.
`checksec` shows: `NX Enabled`, `RELRO Partial`.

## 2. Exploitation (ROP)
Since we can't execute the stack, we must reuse code already in memory (libc).
1.  **Leak Libc**: We overflow to call `puts(got_puts)`. This prints the address of `puts` in memory, defeating ASLR.
2.  **Calculate Base**: `Address - Offset = Libc Base`.
3.  **One Gadget**: We find `system("/bin/sh")` in libc.
4.  **Chain**: We explicitly call `system` with the address of `/bin/sh` string.

## Conclusion
ROP is like writing a ransom note by cutting letters out of a magazine.
