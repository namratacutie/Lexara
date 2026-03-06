CREATE DATABASE IF NOT EXISTS lexara_db;
USE lexara_db;

CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    perm_address TEXT NOT NULL,
    temp_address TEXT,
    citizenship_no VARCHAR(50) UNIQUE,
    national_id_no VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    case_type ENUM('plaintiff', 'defendant') NOT NULL,
    case_details TEXT NOT NULL,
    keywords TEXT, -- Comma separated keywords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);
