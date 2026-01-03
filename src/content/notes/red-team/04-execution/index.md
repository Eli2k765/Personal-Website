---
title: Execution
tags: [red-team, mitre, execution, code-execution]
description: The adversary is trying to run malicious code on your network.
date: 2024-01-02
---

# Execution (TA0002)

Execution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Network Service Scanning.

## Techniques Overview
- **Command and Scripting Interpreter**: PowerShell, Bash, Python.
- **User Execution**: Tricking the user into running malicious code (Macros, LNKs).
- **Container Administration Command**: Executing code inside Docker/K8s.
- **Scheduled Task/Job**: (See Persistence).

## Strategy
Execution is the "How". "How do I run my tool?"
- **Constraint**: EDR blocks `powershell.exe`.
- **Bypass**: Use `PowerShell.System.Automation.dll` via C# (Unmanaged PowerShell).
