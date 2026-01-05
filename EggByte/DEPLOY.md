# Deployment Guide (EggByte Version)

## 🚀 Fastest Way (Existing Server)

Since this folder (`EggByte`) contains the polished version of your site (with Neko cats, new Layout, etc), use these instructions.

### 1. Build the Site
Run the following terminal command in this folder:
```powershell
node build.js
```
*This updates the `public/` folder with your latest changes.*

### 2. Upload to Server
If you have SSH/SCP access to your server (eli2k.com):

**Command Line (PowerShell/Git Bash):**
```bash
scp -r public/* username@your-server-ip:/var/www/html
```
*(Replace `username`, `your-server-ip`, and `/var/www/html` with your actual server details).*

**Graphical (WinSCP / FileZilla):**
1.  Connect to your server.
2.  Navigate to your web root (e.g., `/var/www/html`).
3.  Drag the **contents** of the local `EggByte/public` folder into the remote folder.

### 3. Verify
Go to [eli2k.com](https://eli2k.com).

## Option 2: Automated Script
Edit `deploy.ps1` in this folder with your server details, then run `.\deploy.ps1`.
