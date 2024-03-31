CREATE DATABASE IF NOT EXISTS ecosync;
use ecosync;
-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(15),
    address VARCHAR(255)
);

-- Roles Table
CREATE TABLE IF NOT EXISTS Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    description TEXT
);

-- Permissions Table
CREATE TABLE IF NOT EXISTS Permissions (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    description TEXT
);

-- User_Roles Table (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS User_Roles (
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    PRIMARY KEY (user_id)
);

-- User_Permissions Table (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS Role_Permissions (
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    FOREIGN KEY (permission_id) REFERENCES Permissions(permission_id),
    PRIMARY KEY (role_id, permission_id)
);

-- Table for Vehicles
CREATE TABLE IF NOT EXISTS Vehicles (
    VehicleRegistrationNumber VARCHAR(20) PRIMARY KEY,
    Type VARCHAR(20) NOT NULL,
    Capacity INT NOT NULL, -- in tonnes
    FuelCostPerKmLoaded DECIMAL(10, 2) NOT NULL,
    FuelCostPerKmUnloaded DECIMAL(10, 2) NOT NULL
);

-- Table for STS (Solid Transfer Stations)
CREATE TABLE IF NOT EXISTS STS (
    WardNumber INT PRIMARY KEY,
    CapacityInTonnes INT NOT NULL,
    address VARCHAR(100) NOT NULL,
    Longitude VARCHAR(100) NOT NULL,
    Latitude VARCHAR(100) NOT NULL
);

-- Table for STS Managers
CREATE TABLE IF NOT EXISTS STSManagers (
    STSManagerID INT PRIMARY KEY,
    WardNumber INT,
    Name VARCHAR(50),
    FOREIGN KEY (WardNumber) REFERENCES STS(WardNumber),
    FOREIGN KEY (STSManagerID) REFERENCES Users(user_id)
);

-- Many-to-Many Table for STS and Vehicles
CREATE TABLE IF NOT EXISTS STSVehicles (
    WardNumber INT,
    VehicleRegistrationNumber VARCHAR(20),
    PRIMARY KEY (VehicleRegistrationNumber),
    FOREIGN KEY (WardNumber) REFERENCES STS(WardNumber),
    FOREIGN KEY (VehicleRegistrationNumber) REFERENCES Vehicles(VehicleRegistrationNumber)
);

-- Table for STS Entries
CREATE TABLE IF NOT EXISTS STSEntries (
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    WardNumber INT,
    VehicleRegistrationNumber VARCHAR(20),
    WeightOfWaste INT NOT NULL,
    TimeOfArrival DATETIME NOT NULL,
    TimeOfDeparture DATETIME NOT NULL,
    FOREIGN KEY (WardNumber) REFERENCES STS(WardNumber),
    FOREIGN KEY (VehicleRegistrationNumber) REFERENCES Vehicles(VehicleRegistrationNumber)
);

-- Table for Landfill Sites
CREATE TABLE IF NOT EXISTS LandfillSites (
    LandfillID INT PRIMARY KEY,
    Capacity INT NOT NULL,
    OperationalTimespan VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    Longitude VARCHAR(100) NOT NULL,
    Latitude VARCHAR(100) NOT NULL
);

-- Table for Landfill Managers
CREATE TABLE IF NOT EXISTS LandfillManagers (
    LandfillManagerID INT PRIMARY KEY,
    LandfillID INT,
    Name VARCHAR(50),
    FOREIGN KEY (LandfillID) REFERENCES LandfillSites(LandfillID),
    FOREIGN KEY (LandfillManagerID) REFERENCES Users(user_id)
);

-- Table for Landfill Entries
CREATE TABLE IF NOT EXISTS LandfillEntries (
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    LandfillID INT,
    VehicleRegistrationNumber VARCHAR(20),
    WeightOfWaste INT NOT NULL,
    TimeOfArrival DATETIME NOT NULL,
    TimeOfDeparture DATETIME NOT NULL,
    FOREIGN KEY (LandfillID) REFERENCES LandfillSites(LandfillID),
    FOREIGN KEY (VehicleRegistrationNumber) REFERENCES Vehicles(VehicleRegistrationNumber)
);

INSERT IGNORE INTO Roles (name, description)
SELECT * FROM (
    SELECT 'System Admin', 'Full access to all system functionalities' UNION ALL
    SELECT 'STS Manager', 'Manage Secondary Transfer Stations' UNION ALL
    SELECT 'Landfill Manager', 'Manage Landfill Operations' UNION ALL
    SELECT 'Unassigned', 'No access granted. Default role for newly created users.'
) AS roles
WHERE NOT EXISTS (SELECT * FROM Roles);

INSERT IGNORE INTO Permissions (name, description)
SELECT * FROM (
    SELECT 'Create User', 'Permission to create new users' UNION ALL
    SELECT 'Update Profile', 'Permission to update user profile' UNION ALL
    SELECT 'Assign Permissions', 'Permission to assign permissions to roles' UNION ALL
    SELECT 'Assign Roles', 'Permission to assign roles to users' UNION ALL
    SELECT 'Add Vehicles', 'Permission to add vehicles to the system' UNION ALL
    SELECT 'Create STS', 'Permission to create a new STS' UNION ALL
    SELECT 'Add Entry of Lanfills', 'Permission to create a new STS' UNION ALL
    SELECT 'Add Entry of STS', 'Permission to add entry of vehicles to the system'
) AS permissions
WHERE NOT EXISTS (SELECT * FROM Permissions);


