---
title: "HTB: TombWatcher"
tags: [htb, windows, hard, persistence, ad]
date: 2025-01-01
description: Hunting for and abusing advanced Active Directory persistence mechanisms.
---

# Hack The Box: TombWatcher

**Difficulty**: Hard  
**OS**: Windows

## Concept
Investigating "Tombstoned" objects and hidden persistence.

## Attack Path
1.  **ACL Scanner**: Identify modified ACLs on the AdminSDHolder object.
2.  **SDProp**: Abuse the Security Descriptor Propagation mechanism to regain Admin access explicitly denied by defenders.
