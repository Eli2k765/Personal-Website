---
title: Privilege Escalation
tags: [red-team, mitre, priv-esc]
description: The adversary is trying to gain higher-level permissions.
date: 2024-01-02
---

# Privilege Escalation (TA0004)

Privilege Escalation consists of techniques that adversaries use to gain higher-level permissions on a system or network. Adversaries can often enter and explore a network with unprivileged access but require elevated permissions to follow through on their objectives. Common approaches are to exploit system weaknesses, misconfigurations, and vulnerabilities.

## Strategy
- **Vertical Escalation**: Going from User -> Admin (or Root).
- **Horizontal Escalation**: Going from User A -> User B (who has access to the target).

## Key Techniques
- **Abuse Elevation Control Mechanism**: Bypassing UAC or abusing Sudo.
- **Access Token Manipulation**: Stealing the identity of a logged-in admin.
- **Hijack Execution Flow**: Tricking a privileged service into running your code (DLL Hijacking).
