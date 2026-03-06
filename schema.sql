-- 1. DATABASE CREATION
-- Creates the database if it doesn't already exist and selects it for use.
CREATE DATABASE IF NOT EXISTS lexara_db;
USE lexara_db;

-- 2. CLIENTS TABLE
-- Stores general personal information for legal clients.
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique internal identifier
    first_name VARCHAR(100) NOT NULL,           -- Client's legal first name
    last_name VARCHAR(100) NOT NULL,            -- Client's legal last name
    dob DATE NOT NULL,                          -- Date of birth for identification
    perm_address TEXT NOT NULL,                 -- Official permanent residence
    temp_address TEXT,                          -- Current temporary living address
    citizenship_no VARCHAR(50) UNIQUE,           -- ID for citizenship verification
    national_id_no VARCHAR(50) UNIQUE,           -- Government National ID Number
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);

-- 3. CASES TABLE
-- Stores specific legal case information linked to a specific client.
CREATE TABLE IF NOT EXISTS cases (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique case identification number
    client_id INT NOT NULL,                     -- Foreign key linking to the 'clients' table
    case_type ENUM('plaintiff', 'defendant') NOT NULL, -- Role of the client in the case
    case_details TEXT NOT NULL,                 -- Narrative description of the case/defense
    keywords TEXT,                              -- Comma-separated list for indexing and linking
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Case filing timestamp
    
    -- Foreign key constraint: Deleting a client will automatically remove their cases.
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);
