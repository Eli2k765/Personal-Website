---
title: "HTB Pro Lab: Zephyr"
tags: [htb, pro-lab, active-directory, cobalt-strike, c2, evasion, kerberos]

description: "Intermediate Red Teaming. A masterclass in C2 infrastructure, heavy Kerberos abuse, and bypassing standard AV defenses."
---

# Hack The Box Pro Lab: Zephyr

**Scenario**: Advanced Persistent Threat (APT) simulation.
**Focus**: Evasion & Active Directory.
**Tools**: Cobalt Strike (or Sliver), BloodHound, Rubeus.

Zephyr differs from Dante. In Dante, you are loud. In Zephyr, if you are loud, the "Blue Team" (simulated scripts) will kill your shells.

## 1. Initial Access (The Macro)

We generate a payload.
`msfvenom` is detected instantly.
We write a custom VBA Macro for a Word Document.
We use **WMI** (Windows Management Instrumentation) within the macro to spawn a process, breaking the parent-child tree that EDRs look for (Word -> Powershell).
We email it (simulated) and get a callback.

## 2. Establishing C2 (The Beacon)

We are running in memory. We need persistence.
We configure a **Cobalt Strike Malleable C2 Profile**.
*   **Jitter**: 20% (Randomizes callback times).
*   **Sleep**: 60s (Slow, frustrating, but stealthy).
*   **Traffic**: Looks like `jquery.min.js` requests.

## 3. Enumeration (BloodHound)

We run **SharpHound** with the `--stealth` flag and `Loop`.
We upload the data to BloodHound.
**Path Discovery**:
`User: Alice` -> `Group: HelpDesk` -> `Computer: WS-01` -> `Session: Bob (Domain Admin)`.

We need to compromise `WS-01` to dump Bob's credentials.

## 4. Lateral Movement (Kerberos)

We cannot just psexec. Psexec creates a service; it's too noisy.
We use **WinRM** or **WMI**.
We abuse **Kerberos Unconstrained Delegation**.
We identify a server trusted for delegation.
We coerce the DC to authenticate to it (Printer Bug).
We capture the TGT (Ticket Granting Ticket) of the Domain Controller machine account.

## 5. The Golden Ticket

With the DC's TGT, we perform a **DCSync**.
We extract the `krbtgt` hash.
We forge a **Golden Ticket**. We are now valid for 10 years as any user we want.

## Conclusion
Zephyr enforces a "Low and Slow" mindset. It forces you to understand *how* your tools work (what API calls they make) rather than just running them.
