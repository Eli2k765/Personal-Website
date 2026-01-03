---
title: "HTB: Cicada"
tags: [htb, windows, medium, active-directory, forest-trust]
date: 2025-01-01
description: Exploiting Forest Trusts and Child-Parent domain relationships.
---

# Hack The Box: Cicada

**Difficulty**: Medium  
**OS**: Windows

## Concept
Moving laterally from a compromised Child Domain to the Parent Root Domain.

## Attack Path
1.  **Enumeration**: Identify the Trust relationship (`nltest /domain_trusts`).
2.  **SID History**: Compromise the Child DC (KRBTGT).
3.  **Golden Ticket**:Forge a Golden Ticket with `SID History` injected with the Parent Domain's "Enterprise Admins" SID.
4.  **Execute**: Access the Parent DC file system as Admin.
