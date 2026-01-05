---
title: Supply Chain Compromise
tags: [initial-access, supply-chain, dependency-confusion, npm, pip]
description: Compromising software dependencies and development tools to infiltrate targets.
date: 2024-01-02
---

# Supply Chain Compromise (T1195)

Why hack the target effectively when you can hack the tool they trust?

## 1. Compromise Software Dependencies
Developers trust `npm install` and `pip install`.
- **Dependency Confusion**:
  1.  Find an internal package name like `company-auth-lib` in `package.json`.
  2.  Register that same name on public NPM with a higher version number.
  3.  The build server pulls the public (malicious) version instead of the internal one.

## 2. Compromise Development Tools
- **IDE Extensions**: Malicious VSCode extensions that steal environment variables (AWS Keys).
- **CI/CD Pipelines**: Compromising a GitHub Action to inject code into every build.

## 3. Hardware Supply Chain
- **Interdiction**: Intercepting a router shipment to implant firmware (NSA-style). Rare for red teams, but physically possible.
