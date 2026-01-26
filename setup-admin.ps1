# Admin Setup - Quick Start Script
# Run this after starting the development server

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ADMIN ACCOUNT SETUP - QUICK START" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
Write-Host "Step 1: Checking if dev server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Dev server is running!" -ForegroundColor Green
} catch {
    Write-Host "✗ Dev server is NOT running!" -ForegroundColor Red
    Write-Host "  Please run: npm run dev" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "Step 2: Initializing admin account..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/admin/init" -Method POST -ContentType "application/json"
    
    if ($response.success) {
        Write-Host "✓ Admin account initialized successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host "  ADMIN CREDENTIALS" -ForegroundColor Cyan
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host "  Email:    admin@amer.com" -ForegroundColor White
        Write-Host "  Password: 100200300" -ForegroundColor White
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "  1. Go to: http://localhost:3000/admin/login" -ForegroundColor White
        Write-Host "  2. Enter the credentials above" -ForegroundColor White
        Write-Host "  3. Access admin dashboard" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "✗ Failed to initialize admin account" -ForegroundColor Red
        Write-Host "  Error: $($response.message)" -ForegroundColor Red
        Write-Host ""
    }
} catch {
    Write-Host "✗ Error calling API:" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  - MongoDB connection (MONGODB_URI in .env.local)" -ForegroundColor White
    Write-Host "  - JWT_SECRET is set in .env.local" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "Step 3: Testing admin login..." -ForegroundColor Yellow

$loginData = @{
    email = "admin@amer.com"
    password = "100200300"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/admin/login" -Method POST -Body $loginData -ContentType "application/json"
    
    if ($loginResponse.success) {
        Write-Host "✓ Admin login successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "User Details:" -ForegroundColor Cyan
        Write-Host "  Name:  $($loginResponse.user.name)" -ForegroundColor White
        Write-Host "  Email: $($loginResponse.user.email)" -ForegroundColor White
        Write-Host "  Role:  $($loginResponse.user.role)" -ForegroundColor White
        Write-Host ""
        Write-Host "✓ All tests passed!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "✗ Admin login failed" -ForegroundColor Red
        Write-Host "  Error: $($loginResponse.message)" -ForegroundColor Red
        Write-Host ""
    }
} catch {
    Write-Host "✗ Login test failed:" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access admin dashboard at:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000/admin/login" -ForegroundColor White
Write-Host ""
