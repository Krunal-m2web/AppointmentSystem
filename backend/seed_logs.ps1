$connString = "Server=localhost;Database=AppointmentDb;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection $connString
$conn.Open()

$email = "parmarpratik9642@gmail.com"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT Id, CompanyId, Phone FROM Customers WHERE Email = '$email'"
$reader = $cmd.ExecuteReader()

if ($reader.Read()) {
    $id = $reader["Id"]
    $companyId = $reader["CompanyId"]
    $phone = $reader["Phone"]
    $reader.Close()

    echo "Found Customer ID: $id"

    # Insert Email Log
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = @"
    INSERT INTO EmailLogs (CompanyId, ToEmail, FromEmail, Subject, SentAt, AppointmentId)
    VALUES ($companyId, '$email', 'system@appointment.com', 'Test Appointment Confirmation', GETUTCDATE(), NULL)
"@
    $cmd.ExecuteNonQuery()
    echo "Inserted Email Log"

    # Insert SMS Log
    if ($phone) {
        $cmd = $conn.CreateCommand()
        $cmd.CommandText = @"
        INSERT INTO SMSLogs (CompanyId, ToNumber, FromNumber, MessageBody, SentAt, AppointmentId)
        VALUES ($companyId, '$phone', 'SYSTEM', 'Test SMS: Your appointment is confirmed.', GETUTCDATE(), NULL)
"@
        $cmd.ExecuteNonQuery()
        echo "Inserted SMS Log"
    }
} else {
    echo "Customer not found."
    $reader.Close()
}

$conn.Close()
