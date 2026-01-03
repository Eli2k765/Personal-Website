---
title: AI-Driven Operations & Triage
tags: [blue-team, ai, llm, automation, soar]
description: Using AI agents to automate Tier 1/2 triage and reduce analyst fatigue.
date: 2024-01-02
---

# AI-Driven Operations & Triage

Automating the "Stare and Compare".

## 1. The Problem: Alert Fatigue
SOC analysts are drowning.
- **Tier 1 Reality**: 90% of time is spent gathering context: "Is this IP bad? Is this user separate from HR? Has this machine happened before?"
- **Burnout**: Repetitive, low-context tasks destroy morale.

## 2. AI Agents for Triage (Tier 1/2)
Using LLMs (Large Language Models) as autonomous agents to perform the initial investigation.
- **Workflow**:
  1.  **Alert Fires**: "Suspicious PowerShell" on Host A.
  2.  **AI Agent Activates**:
      - Queries Active Directory: "Who owns Host A?"
      - Queries Threat Intel: "Is the IP in the command malicious?"
      - Queries History: "Has the user run this script before?"
  3.  **Decision**:
      - **False Positive**: "User is a Developer, script is known good. Auto-Closing."
      - **Escalate**: "Unknown script, external IP link. Detailed summary prepared for Human Tier 3."

## 3. Human-in-the-Loop (HITL)
AI doesn't replace the analyst; it gives them superpowers.
- Instead of "Here is a raw log," the analyst gets "Here is a formulated Incident Case with all context attached, waiting for your 'Contain' approval."

## 4. Efficiencies
- **Speed**: Machines query APIs milliseconds faster than humans copy-paste.
- **Consistency**: AI follows the playbook exactly every time.
