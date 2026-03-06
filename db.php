<?php
/**
 * DATABASE CONNECTION CONFIGURATION (LEXARA)
 * Uses PDO (PHP Data Objects) for secure, prepared-statement based access.
 */

// 1. Connection Parameters: Adjust based on the hosting environment
$host = 'localhost';        // Database server host
$db   = 'lexara_db';       // Name of the database to connect to
$user = 'root';            // Database username (default for XAMPP/WAMP is 'root')
$pass = '';                // Database password (default is empty for local dev)
$charset = 'utf8mb4';      // Multi-byte character set for global compatibility

// 2. Data Source Name (DSN): The connection string format for PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// 3. Error Handling and Fetch Options: Set to throw exceptions for better debugging
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throws exceptions on SQL errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Returns results as associative arrays
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Uses native prepared statements for security
];

try {
     // Initialize the PDO connection instance
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     // Error Handling: In production, log this instead of echoing the raw error
     die("Connection failed: " . $e->getMessage());
}
?>
