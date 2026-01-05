---
title: "LetsDefend: Event ID 88 - Phishing URL"
tags: [letsdefend, blue-team, edr, browser-forensics, phishing, soc]

description: "A full SOC investigation walkthrough. Correlating EDR alerts with browser history to detect a credential harvesting attack."
---

# LetsDefend: Event ID 88 - Phishing URL

**Platform**: LetsDefend (SOC Analysis)
**Alert ID**: 88
**Severity**: High

In this investigation, we respond to an EDR alert indicating that a user engaged with a malicious URL. Our goal is to determine if the device was compromised and identify the vector.

---

## 1. Triage & Monitoring

We start by examining the alert details in the Dashboard.

*   **Alert Time**: Mar 21, 2021, 02:15 PM
*   **Hostname**: `Workstation-01`
*   **User**: `Lars`
*   **Rule Name**: `SOC106 - Malware Detected` (Actually flagged as Phishing URL Detected in EDR)
*   **Trigger Process**: `chrome.exe`

The alert tells us the browser (Chrome) attempted to access a known bad domain.

---

## 2. Investigation (Log Management)

We navigate to **Log Management** to correlate the network traffic. We search for the source IP of `Workstation-01` (`172.16.17.15`).

### Network Logs
We observe HTTP traffic to `web-mail-login.com`.
This is a classic **Typosquatting** domain, mimicking a legitimate webmail provider.

### Endpoint Security (EDR)
We drill down into the endpoint logs for `Workstation-01`.
*   **Process History**:
    1.  `outlook.exe` (Email Client)
    2.  `chrome.exe` (Launched URL: `http://web-mail-login.com`)
    3.  `chrome.exe` (Downloaded: `login_script.js`) - *Blocked by EDR*

### Artifact Analysis
We take the URL `web-mail-login.com` and check it against Threat Intelligence sources (VirusTotal, AlienVault OTX).
*   **VirusTotal**: 15/90 Security Vendors flag this as **Phishing**.
*   **Domain Age**: Created 2 days ago (High risk indicator).

---

## 3. The Playbook

LetsDefend provides a playbook to guide the response.

**Q1: Is the traffic malicious?**
> **Yes**. The domain is fresh, flagged by TI, and mimics a login page.

**Q2: What is the attack vector?**
> **Email**. The process lineage shows `Outlook.exe` spawned the browser. The user likely clicked a link in a phishing email.

**Q3: Was the file downloaded?**
> **No**. The EDR logs explicitly state "Action: Blocked" for the script download.

**Q4: Is the host compromised?**
> **No**. The attack was stopped at the delivery stage. No C2 beaconing was observed in the network logs after the event.

---

## 4. Remediation & Verdict

Since the attack was blocked, our remediation is focused on prevention and cleanup.

1.  **Containment**: Not necessary (Attack blocked), but we can isolate the host to be safe if corporate policy dictates.
2.  **Email Purge**: Search Exchange logs for the sender of the phishing email and delete it from all other inboxes.
3.  **Block Domain**: Add `web-mail-login.com` to the perimeter firewall blacklist.

### Final Verdict
*   **True Positive**
*   **Malicious Traffic**: Yes
*   **Compromised**: No

## Conclusion
This alert underscores the importance of **Process Lineage**. Seeing `Outlook` -> `Chrome` -> `Suspicious URL` is the smoking gun for Email Phishing. Even though the EDR blocked the payload, the "Human Vulnerability" (the user clicking the link) remains unpatched.
