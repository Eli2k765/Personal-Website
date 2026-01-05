# Configuration
$IdentityFile = "C:\Users\erodg\.ssh\eli2k\root"
$RemoteUser = "root"
$RemoteHost = "eli2k.com"
$RemotePath = "/var/www/root" # Updated as requested
$LocalPath = "public"   # Local folder containing site

# 1. Build
Write-Host "1. Building site..." -ForegroundColor Cyan
node build.js

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed. Aborting."
    exit 1
}

# 2. Clean Remote Directory (SSH)
Write-Host "2. Cleaning remote directory ($RemotePath)..." -ForegroundColor Yellow
ssh -i $IdentityFile "$($RemoteUser)@$($RemoteHost)" "rm -rf $RemotePath/*"

# 3. Upload (SCP)
# Note: copying contents of public/* to remote/
Write-Host "3. Uploading new files..." -ForegroundColor Cyan
# PowerShell SCP syntax note: ensuring trailing slash on source directory copies CONTENTS
scp -i $IdentityFile -r "$LocalPath\*" "$($RemoteUser)@$($RemoteHost):$RemotePath/"

# 4. Permissions (Web Server)
Write-Host "4. Setting permissions (755/644)..." -ForegroundColor Yellow
ssh -i $IdentityFile "$($RemoteUser)@$($RemoteHost)" "find $RemotePath -type d -exec chmod 755 {} \; && find $RemotePath -type f -exec chmod 644 {} \;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment Complete! Site content replaced and permissions set." -ForegroundColor Green
}
else {
    Write-Error "Deployment/Permissions failed."
}
