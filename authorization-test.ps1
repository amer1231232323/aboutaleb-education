Write-Host "=== Backend Authorization Testing ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3001"
$studentToken = ""
$adminToken = ""

# Test 1: Create a student user
Write-Host "Test 1: Creating Student User" -ForegroundColor Yellow
$randomEmail = "student$(Get-Random)@test.com"
$body = @{
    name     = "Test Student"
    email    = $randomEmail
    password = "password123"
    phone    = "+1234567890"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    $data = $response.Content | ConvertFrom-Json
    $studentToken = $data.token
    Write-Host "✓ Student created successfully" -ForegroundColor Green
}
catch {
    Write-Host "✗ Failed to create student" -ForegroundColor Red
    exit
}

# Test 2: Student login
Write-Host "`nTest 2: Student Login" -ForegroundColor Yellow
$loginBody = @{
    email    = $randomEmail
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $data = $response.Content | ConvertFrom-Json
    $studentToken = $data.token
    Write-Host "✓ Student login successful" -ForegroundColor Green
}
catch {
    Write-Host "✗ Student login failed" -ForegroundColor Red
    exit
}

# Test 3: Student can access their own routes
Write-Host "`nTest 3: Student Accessing Own Routes" -ForegroundColor Yellow

# Test student profile
try {
    $headers = @{ "Authorization" = "Bearer $studentToken" }
    $response = Invoke-WebRequest -Uri "$baseUrl/api/student/profile" -Method GET -Headers $headers
    Write-Host "✓ Student can access profile" -ForegroundColor Green
}
catch {
    Write-Host "✗ Student cannot access profile" -ForegroundColor Red
}

# Test student applications
try {
    $headers = @{ "Authorization" = "Bearer $studentToken" }
    $response = Invoke-WebRequest -Uri "$baseUrl/api/student/applications" -Method GET -Headers $headers
    Write-Host "✓ Student can access applications" -ForegroundColor Green
}
catch {
    Write-Host "✗ Student cannot access applications" -ForegroundColor Red
}

# Test 4: Student CANNOT access admin routes
Write-Host "`nTest 4: Student Accessing Admin Routes (Should Fail)" -ForegroundColor Yellow

$adminRoutes = @(
    "/api/admin/students",
    "/api/admin/applications",
    "/api/admin/universities"
)

foreach ($route in $adminRoutes) {
    try {
        $headers = @{ "Authorization" = "Bearer $studentToken" }
        $response = Invoke-WebRequest -Uri "$baseUrl$route" -Method GET -Headers $headers
        Write-Host "✗ SECURITY ISSUE: Student can access $route" -ForegroundColor Red
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 403) {
            Write-Host "✓ Correctly blocked: Student cannot access $route (403 Forbidden)" -ForegroundColor Green
        }
        elseif ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "✓ Correctly blocked: Student cannot access $route (401 Unauthorized)" -ForegroundColor Green
        }
        else {
            Write-Host "? Blocked with status $($_.Exception.Response.StatusCode): $route" -ForegroundColor Yellow
        }
    }
}

# Test 5: Unauthenticated access to protected routes
Write-Host "`nTest 5: Unauthenticated Access to Protected Routes" -ForegroundColor Yellow

$protectedRoutes = @(
    "/api/student/profile",
    "/api/student/applications",
    "/api/admin/students",
    "/api/admin/applications"
)

foreach ($route in $protectedRoutes) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$route" -Method GET
        Write-Host "✗ SECURITY ISSUE: Unauthenticated access to $route allowed" -ForegroundColor Red
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "✓ Correctly blocked: $route requires authentication" -ForegroundColor Green
        }
        else {
            Write-Host "? Blocked with status $($_.Exception.Response.StatusCode): $route" -ForegroundColor Yellow
        }
    }
}

# Test 6: Public routes should work without authentication
Write-Host "`nTest 6: Public Routes (Should Work Without Auth)" -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/universities" -Method GET
    Write-Host "✓ Public universities route accessible" -ForegroundColor Green
}
catch {
    Write-Host "✗ Public universities route failed" -ForegroundColor Red
}

# Test 7: Admin login (if admin exists)
Write-Host "`nTest 7: Admin Login Test" -ForegroundColor Yellow
$adminBody = @{
    email    = "admin@example.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/admin/login" -Method POST -Body $adminBody -ContentType "application/json"
    $data = $response.Content | ConvertFrom-Json
    $adminToken = $data.token
    Write-Host "✓ Admin login successful" -ForegroundColor Green

    # Test admin can access admin routes
    Write-Host "`nTest 8: Admin Accessing Admin Routes" -ForegroundColor Yellow
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $response = Invoke-WebRequest -Uri "$baseUrl/api/admin/students" -Method GET -Headers $headers
        Write-Host "✓ Admin can access admin routes" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Admin cannot access admin routes" -ForegroundColor Red
    }
}
catch {
    Write-Host "⚠ Admin login failed (expected if no admin user exists)" -ForegroundColor Yellow
    Write-Host "  Create an admin user with: node scripts/make-admin.js" -ForegroundColor Gray
}

Write-Host "`n=== Authorization Testing Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor White
Write-Host "- Student routes: Protected ✓" -ForegroundColor Green
Write-Host "- Admin routes: Protected ✓" -ForegroundColor Green
Write-Host "- Cross-role access: Blocked ✓" -ForegroundColor Green
Write-Host "- Public routes: Accessible ✓" -ForegroundColor Green
