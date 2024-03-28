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

-- Vehicles Table
CREATE TABLE IF NOT EXISTS Vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20),
    type ENUM('Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier'),
    capacity ENUM('3 ton', '5 ton', '7 ton')
);

-- STS (Secondary Transfer Stations) Table
CREATE TABLE IF NOT EXISTS STS (
    sts_id INT AUTO_INCREMENT PRIMARY KEY,
    ward_number INT,
    capacity_tonnes INT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    sts_manager_id INT,
    FOREIGN KEY (sts_manager_id) REFERENCES Users(user_id)
);

-- Vehicle_Entries Table
CREATE TABLE IF NOT EXISTS Vehicle_Entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    sts_id INT,
    vehicle_id INT,
    volume_of_waste DECIMAL(10, 2),
    time_of_arrival DATETIME,
    time_of_departure DATETIME,
    FOREIGN KEY (sts_id) REFERENCES STS(sts_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

-- Landfills Table
CREATE TABLE IF NOT EXISTS Landfills (
    landfill_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

-- Landfill_Entries Table
CREATE TABLE IF NOT EXISTS Landfill_Entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    landfill_id INT,
    vehicle_id INT,
    volume_of_waste DECIMAL(10, 2),
    time_of_arrival DATETIME,
    time_of_departure DATETIME,
    FOREIGN KEY (landfill_id) REFERENCES Landfills(landfill_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

-- Oil_Allocation Table
CREATE TABLE IF NOT EXISTS Oil_Allocation (
    oil_allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    amount_allocated DECIMAL(10, 2),
    date_allocated DATE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS Vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20),
    type ENUM('Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier'),
    capacity ENUM('3 ton', '5 ton', '7 ton')
);

-- STS (Secondary Transfer Stations) Table
CREATE TABLE IF NOT EXISTS STS (
    sts_id INT AUTO_INCREMENT PRIMARY KEY,
    ward_number INT,
    capacity_tonnes INT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    sts_manager_id INT,
    FOREIGN KEY (sts_manager_id) REFERENCES Users(user_id)
);

-- STS Entries Table
CREATE TABLE IF NOT EXISTS STS_Entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    sts_id INT,
    vehicle_id INT,
    volume_of_waste DECIMAL(10, 2),
    time_of_arrival DATETIME,
    time_of_departure DATETIME,
    FOREIGN KEY (sts_id) REFERENCES STS(sts_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

-- Landfills Table
CREATE TABLE IF NOT EXISTS Landfills (
    landfill_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

-- Landfill Entries Table
CREATE TABLE IF NOT EXISTS Landfill_Entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    landfill_id INT,
    vehicle_id INT,
    volume_of_waste DECIMAL(10, 2),
    time_of_arrival DATETIME,
    time_of_departure DATETIME,
    FOREIGN KEY (landfill_id) REFERENCES Landfills(landfill_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

-- Oil Allocation Table
CREATE TABLE IF NOT EXISTS Oil_Allocation (
    oil_allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    amount_allocated DECIMAL(10, 2),
    date_allocated DATE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

CREATE TABLE IF NOT EXISTS STS_Manager_Assignment (
    manager_id INT,
    ward_number INT,
    FOREIGN KEY (manager_id) REFERENCES Users(user_id),
    PRIMARY KEY (ward_number)
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
    SELECT 'Add Entry of Vehicles', 'Permission to add entry of vehicles to the system' UNION ALL
    SELECT 'Add Entry of Truck', 'Permission to add entry of truck to the system'
) AS permissions
WHERE NOT EXISTS (SELECT * FROM Permissions);


