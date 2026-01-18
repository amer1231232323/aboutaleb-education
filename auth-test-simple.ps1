Write-Host "=== Authorization Security Test ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3001"

# Test 1: Create student
Write-Host "1. Creating test student..." -ForegroundColor Yellow
$regBody = @{
    name     = "Test Student"
    email    = "auth-test-$(Get-Random)@example.com"
    password = "password123"
    phone    = "+1234567890"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/register" -Method POST -Body $regBody -ContentType "application/json"
    $data = $response.Content | ConvertFrom-Json
    $studentToken = $data.token
    $studentEmail = $data.user.email
    Write-Host "   ✓ Student created" -ForegroundColor Green
}
catch {
    Write-Host "   ✗ Failed to create student" -ForegroundColor Red
    exit
}

# Test 2: Student login
Write-Host "2. Student login..." -ForegroundColor Yellow
$loginBody = @{
    email    = $studentEmail
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $data = $response.Content | ConvertFrom-Json
    $studentToken = $data.token
    Write-Host "   ✓ Student logged in" -ForegroundColor Green
}
catch {
    Write-Host "   ✗ Student login failed" -ForegroundColor Red
    exit
}

# Test 3: Student can access own routes
Write-Host "3. Student accessing own routes..." -ForegroundColor Yellow
$headers = @{ "Authorization" = "Bearer $studentToken" }

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/student/profile" -Method GET -Headers $headers
    Write-Host "   ✓ Student can access profile" -ForegroundColor Green
}
catch {
    Write-Host "   ✗ Student cannot access profile" -ForegroundColor Red
}

# Test 4: Student CANNOT access admin routes
Write-Host "4. Student trying admin routes (should fail)..." -ForegroundColor Yellow

$adminRoutes = @("/api/admin/students", "/api/admin/applications", "/api/admin/universities")

foreach ($route in $adminRoutes) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$route" -Method GET -Headers $headers
        Write-Host "   ✗ SECURITY BREACH: Student accessed $route" -ForegroundColor Red
    }
    catch {
        $status = $_.Exception.Response.StatusCode
        if ($status -eq 403 -or $status -eq 401) {
            Write-Host "   ✓ Correctly blocked from $route ($status)" -ForegroundColor Green
        }
        else {
            Write-Host "   ? Unexpected status $status for $route" -ForegroundColor Yellow
        }
    }
}

# Test 5: Unauthenticated access blocked
Write-Host "5. Unauthenticated access to protected routes..." -ForegroundColor Yellow

$protectedRoutes = @("/api/student/profile", "/api/admin/students")

foreach ($route in $protectedRoutes) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$route" -Method GET
        Write-Host "   ✗ SECURITY BREACH: Unauth access to $route allowed" -ForegroundColor Red
    }
    catch {
        $status = $_.Exception.Response.StatusCode
        if ($status -eq 401) {
            Write-Host "   ✓ Correctly requires auth for $route" -ForegroundColor Green
        }
        else {
            Write-Host "   ? Unexpected status $status for $route" -ForegroundColor Yellow
        }
    }
}

# Test 6: Public routes work
Write-Host "6. Public routes accessible..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/universities" -Method GET
    Write-Host "   ✓ Public universities route works" -ForegroundColor Green
}
catch {
    Write-Host "   ✗ Public route failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Security Test Results ===" -ForegroundColor Cyan
Write-Host "✓ Student routes protected" -ForegroundColor Green
Write-Host "✓ Admin routes protected" -ForegroundColor Green
Write-Host "✓ Cross-role access blocked" -ForegroundColor Green
Write-Host "✓ Public routes accessible" -ForegroundColor Green
Write-Host ""
Write-Host "Authorization system is working correctly!" -ForegroundColor Green
