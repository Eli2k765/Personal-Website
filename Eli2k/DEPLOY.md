# Deployment Guide for Eli2k

## 🚀 Fastest Way (Existing Server)

If you already have a server (like a VPS at DigitalOcean, Linode, or AWS) and a domain:

1.  **Build the Site** (Locally):
    ```powershell
    cd Eli2k
    node build.js
    ```
    *This generates the static files in the `public/` folder.*

2.  **Upload to Server**:
    Use `scp` (Secure Copy) to upload the contents of `public/` to your server's web root (often `/var/www/html` or `/var/www/eli2k.com`).

    **Command Line (PowerShell/Git Bash):**
    ```bash
    scp -r public/* username@your-server-ip:/var/www/html
    ```
    *(Replace `username`, `your-server-ip`, and the destination path with your actual details).*

    **Graphical (WinSCP / FileZilla):**
    *   Connect to your server via SFTP.
    *   Drag everything *inside* the local `public/` folder to the remote web folder.

3.  **Verify**:
    Visit `eli2k.com` (assuming your DNS A-record points to that server IP).

## Option 2: Automated Script (deploy.ps1)

I've included a script `deploy.ps1` that automates Build + SCP.
1.  Edit `deploy.ps1` and set your `$RemoteUser`, `$RemoteHost`, and `$RemotePath`.
2.  Run: `.\deploy.ps1`

## Option 3: Static Hosts (Vercel / Netlify)

If you decide to switch host:
1.  Push this folder to GitHub.
2.  Import the repo in Vercel/Netlify.
3.  Set Build Command: `node build.js`.
4.  Set Output Directory: `public`.
5.  Add your Custom Domain in their dashboard.
