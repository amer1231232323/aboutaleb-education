# API Testing Script for Windows PowerShell

Write-Host "=== Backend API Testing ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"
$studentToken = ""
$adminToken = ""

# Test 1: Student Registration
Write-Host "Test 1: Student Registration" -ForegroundColor Yellow
try {
    $body = @{
        name = "Test Student"
        email = "teststudent$(Get-Random)@example.com"
        password = "password123"
        phone = "+1234567890"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✓ Registration successful" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    $studentToken = $response.token
    $studentEmail = $response.user.email
} catch {
    Write-Host "✗ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Student Login
Write-Host "Test 2: Student Login" -ForegroundColor Yellow
try {
    $body = @{
        email = $studentEmail
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✓ Login successful" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    $studentToken = $response.token
} catch {
    Write-Host "✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Get Student Profile
Write-Host "Test 3: Get Student Profile" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $studentToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/student/profile" -Method GET -Headers $headers
    Write-Host "✓ Profile retrieved successfully" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Profile retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Get Universities (Public)
Write-Host "Test 4: Get Universities (Public)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/universities" -Method GET
    Write-Host "✓ Universities retrieved successfully" -ForegroundColor Green
    Write-Host "Count: $($response.Length)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Universities retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Get Student Applications
Write-Host "Test 5: Get Student Applications" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $studentToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/student/applications" -Method GET -Headers $headers
    Write-Host "✓ Applications retrieved successfully" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Applications retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 6: Admin Login
Write-Host "Test 6: Admin Login" -ForegroundColor Yellow
Write-Host "Note: This requires an admin account to exist" -ForegroundColor Gray
try {
    $body = @{
        email = "admin@example.com"
        password = "admin123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/admin/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✓ Admin login successful" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    $adminToken = $response.token
} catch {
    Write-Host "✗ Admin login failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  (This is expected if no admin account exists)" -ForegroundColor Gray
}

Write-Host ""

# Test 7: Get All Students (Admin)
if ($adminToken) {
    Write-Host "Test 7: Get All Students (Admin)" -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
        }
        $response = Invoke-RestMethod -Uri "$baseUrl/api/admin/students" -Method GET -Headers $headers
        Write-Host "✓ Students retrieved successfully" -ForegroundColor Green
        Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    } catch {
        Write-Host "✗ Students retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 8: Get All Applications (Admin)
if ($adminToken) {
    Write-Host "Test 8: Get All Applications (Admin)" -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
        }
        $response = Invoke-RestMethod -Uri "$baseUrl/api/admin/applications" -Method GET -Headers $headers
        Write-Host "✓ Applications retrieved successfully" -ForegroundColor Green
        Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    } catch {
        Write-Host "✗ Applications retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 9: Unauthorized Access Test
Write-Host "Test 9: Unauthorized Access Test (Student trying to access admin route)" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $studentToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/admin/students" -Method GET -Headers $headers
    Write-Host "X Security issue: Student accessed admin route!" -ForegroundColor Red
} catch {
    Write-Host "OK Correctly blocked unauthorized access" -ForegroundColor Green
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Testing Complete ===" -ForegroundColor Cyan
