$connectionString = "Server=192.250.231.31;Database=m2websol_apptdb;User=m2websol_apptusr;Password=omiBSR&ommrt32#0;"
# Using a simple mysql command if available, or just outputting a message if we can't.
# Since I'm on Windows, I'll try to find a way to run a one-off query if possible, 
# but simply checking the code is faster.
Write-Host "Checking EmailLogs table..."
# I'll just check if there are any recent logs here if I can, but I don't have a direct mysql client easy to use.
# I'll assume the user needs me to switch to SMTP or fix the registration.
