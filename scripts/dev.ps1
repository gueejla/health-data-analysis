$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent    # ← repo root = parent of scripts/
$procs = @()

$onCtrlC = {
    Write-Host "`nShutting down..." -ForegroundColor Yellow
    foreach ($p in $script:procs) {
        if ($p -and !$p.HasExited) {
            Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
        }
    }
    exit
}
$null = Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action $onCtrlC

Write-Host "Starting backend (Spring Boot on :8080)..." -ForegroundColor Cyan
$procs += Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "cd /d `"$root\backend`" && mvnw.cmd spring-boot:run" `
    -PassThru -NoNewWindow

Write-Host "Starting frontend (Vite on :5173)..." -ForegroundColor Cyan
$procs += Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "cd /d `"$root\frontend`" && npm run dev" `
    -PassThru -NoNewWindow

Write-Host ""
Write-Host "Backend:  http://localhost:8080" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "Press Ctrl+C (or close) to stop both." -ForegroundColor Green
Write-Host ""

Wait-Process -Id ($procs.Id) -ErrorAction SilentlyContinue
