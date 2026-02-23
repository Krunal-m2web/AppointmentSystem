
# 1. Login to get token
$loginBody = @{
    email = "admin@example.com"
    password = "password123" 
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5289/api/auth/admin/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    Write-Host "Logged in successfully."
} catch {
    Write-Error "Login failed: $_"
    exit
}

# 2. Get a valid service ID
try {
    $servicesResponse = Invoke-RestMethod -Uri "http://localhost:5289/api/services?page=1&pageSize=10" -Method Get -Headers @{ Authorization = "Bearer $token" }
    $serviceId = $servicesResponse.items[0].id
    Write-Host "Using Service ID: $serviceId"
} catch {
    Write-Error "Failed to fetch services: $_"
    exit
}

# 3. Function to create appointment
function Create-Appointment {
    param (
        [string]$email,
        [string]$firstName
    )
    
    $date = (Get-Date).AddDays(1).ToString("yyyy-MM-dd")
    
    $body = @{
        firstName = $firstName
        lastName = "User"
        email = $email
        phone = "555-0101"
        serviceId = $serviceId
        staffId = $null
        startTime = "${date}T10:00:00Z"
        meetingType = "InPerson"
        paymentMethod = "Card"
        status = "Confirmed"
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "http://localhost:5289/api/appointments" -Method Post -Body $body -ContentType "application/json"
        Write-Host "Created appointment for $email with ID: $($response.id)"
        return $response
    } catch {
        Write-Host "Error creating appointment: $_"
        return $null
    }
}

# 4. Create appointment for NEW customer
$rnd = Get-Random
$newEmail = "newuser$rnd@example.com"
Write-Host "Creating appointment for NEW customer: $newEmail"
$newAppt = Create-Appointment -email $newEmail -firstName "New"

if ($newAppt -eq $null) {
    Write-Error "Failed to create appointment."
    exit
}

# 5. List appointments to verify it exists
# Note: Use a large page size to ensure we find it, or filter by date
$listResponse = Invoke-RestMethod -Uri "http://localhost:5289/api/appointments?page=1&pageSize=1000&sortBy=id&sortDirection=desc" -Method Get -Headers @{ Authorization = "Bearer $token" }

$found = $listResponse.appointments | Where-Object { $_.customerEmail -eq $newEmail }

if ($found) {
    Write-Host "SUCCESS: Found appointment for new customer in list!"
    Write-Host "Appt ID: $($found.id)"
    Write-Host "Customer Name: $($found.customerName)"
    Write-Host "Status: $($found.status)"
} else {
    Write-Host "FAILURE: Could not find appointment for new customer in list."
    Write-Host "Total appointments fetched: $($listResponse.appointments.Count)"
}
