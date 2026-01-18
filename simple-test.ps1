Write-Host "Testing Backend API..." -ForegroundColor Cyan

# Test 1: Check if server is running
Write-Host "`nTest 1: Server Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/universities" -Method GET
    Write-Host "OK Server is running" -ForegroundColor Green
    Write-Host "Universities found: $($response.Length)" -ForegroundColor Gray
} catch {
    Write-Host "FAIL Server not responding" -ForegroundColor Red
    exit
}

# Test 2: Student Registration
Write-Host "`nTest 2: Student Registration" -ForegroundColor Yellow
$randomEmail = "student$(Get-Random)@test.com"
$body = @{
    name = "Test Student"
    email = $randomEmail
    password = "password123"
    phone = "+1234567890"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "OK Registration successful" -ForegroundColor Green
    Write-Host "User ID: $($response.user.id)" -ForegroundColor Gray
    Write-Host "Role: $($response.user.role)" -ForegroundColor Gray
    $token = $response.token
} catch {
    Write-Host "FAIL Registration failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    exit
}

# Test 3: Student Login
Write-Host "`nTest 3: Student Login" -ForegroundColor Yellow
$body = @{
    email = $randomEmail
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "OK Login successful" -ForegroundColor Green
    $token = $response.token
} catch {
    Write-Host "FAIL Login failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Get Student Profile
Write-Host "`nTest 4: Get Student Profile" -ForegroundColor Yellow
try {
    $headers = @{ "Authorization" = "Bearer $token" }
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/student/profile" -Method GET -Headers $headers
    Write-Host "OK Profile retrieved" -ForegroundColor Green
    Write-Host "Name: $($response.data.name)" -ForegroundColor Gray
    Write-Host "Email: $($response.data.email)" -ForegroundColor Gray
} catch {
    Write-Host "FAIL Profile retrieval failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Get Student Applications
Write-Host "`nTest 5: Get Student Applications" -ForegroundColor Yellow
try {
    $headers = @{ "Authorization" = "Bearer $token" }
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/student/applications" -Method GET -Headers $headers
    Write-Host "OK Applications retrieved" -ForegroundColor Green
    Write-Host "Count: $($response.count)" -ForegroundColor Gray
} catch {
    Write-Host "FAIL Applications retrieval failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Authorization Test (Student accessing admin route)
Write-Host "`nTest 6: Authorization Test" -ForegroundColor Yellow
try {
    $headers = @{ "Authorization" = "Bearer $token" }
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/admin/students" -Method GET -Headers $headers
    Write-Host "FAIL Security issue - student accessed admin route!" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "OK Authorization working correctly (403 Forbidden)" -ForegroundColor Green
    } else {
        Write-Host "OK Blocked but with different status: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
    }
}

Write-Host "`n=== Testing Complete ===" -ForegroundColor Cyan
