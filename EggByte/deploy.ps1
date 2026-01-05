# User Configuration
$RemoteUser = "erodg"
$RemoteHost = "your-server.com"
$RemotePath = "/var/www/html/personal-website"
$LocalPath  = "./public/*"

# Build first
Write-Host "Building site..." -ForegroundColor Cyan
node build.js

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed. Aborting deployment."
    exit 1
}

# Deploy
Write-Host "Deploying to $RemoteHost..." -ForegroundColor Cyan
scp -r $LocalPath "$($RemoteUser)@$($RemoteHost):$RemotePath"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment Successful!" -ForegroundColor Green
} else {
    Write-Error "Deployment failed."
}
