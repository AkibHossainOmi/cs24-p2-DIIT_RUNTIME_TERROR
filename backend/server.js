const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const emailValidator = require('email-existence');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  // password: '123456',
  database: 'ecosync',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/auth/create', (req, res) => {
  let isvalid = false;
  const { username, email, password } = req.body;
    if (email.endsWith('@gmail.com')) {
      // return res.status(400).json({ message: 'Email must be from organization domain' });
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        const newUser = { username, email, password_hash: hashedPassword };
        pool.query('INSERT INTO Users SET ?', newUser, (error, results) => {
          if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ message: 'User already exists' });
            }
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
    
          console.log('User created successfully:', results.insertId);

          // Assign the admin role to the System Admin user
          const adminRoleQuery = 'INSERT INTO User_Roles (user_id, role_id) VALUES (?, (SELECT role_id FROM Roles WHERE name = "System Admin"))';
          pool.query(adminRoleQuery, [results.insertId], (roleError, roleResult) => {
            if (roleError) {
              console.error('Error assigning admin role:', roleError);
              return res.status(500).json({ message: 'Internal server error' });
            }
            const userId = results.insertId;
            const token = jwt.sign({userId}, 'ecosync_secret', { expiresIn: '5m' });
            console.log('Admin role assigned to user:', results.insertId);
            // Send success response
            return res.status(200).json({
              message: `System Admin '${username}' created successfully`,
              token: token
          });
          });
        });
      });
    }
    // else
    // {
      
    // }
});

app.post('/auth/login', (req, res) => {
  const { username, email, password } = req.body;

  pool.query('SELECT * FROM Users WHERE username = ? AND email = ?', [username, email], (error, results) => {
      if (error) {
          console.error('Error fetching user:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }

      
      if (results.length === 0 || !bcrypt.compareSync(password, results[0].password_hash)) {
          return res.status(401).json({ message: 'Incorrect credentials' });
      }
      const userId = results[0].user_id;
      const token = jwt.sign({userId}, 'ecosync_secret', { expiresIn: '5m' });
      return res.status(200).json({
        message: 'Successfully logged in',
        token: token
    });
  });
});

app.post('/auth/logout', (req, res) => {
  return res.status(200).json({ message: 'Logout successful' });
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ecosyncinfo@gmail.com",
    pass: "vglg zlic vtmo emqo",
  },
});


app.post('/auth/reset-password/initiate', (req, res) => {
  const { username_or_email } = req.body;

  
  pool.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username_or_email, username_or_email], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const userId = results[0].user_id;
    const token = jwt.sign({ userId }, 'ecosync_secret', { expiresIn: '5m' });
    
    const mailOptions = {
      from: 'ecosyncinfo@gmail.com',
      to: results[0].email,
      subject: 'Password Reset Token',
      html: `<p>Your token is:</p>
        <p>${token}</p>
        <p>This token will expire in 5 minutes.</p>`
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending verification code email' });
      }

      console.log('Verification code email sent:', info.response);
      return res.status(200).json({ message: 'Verification code sent to email' });
    });
  });
});
//vglg zlic vtmo emqo
//ecosyncinfo@gmail.com

app.put('/auth/reset-password/confirm', (req, res) => {
  const { token_or_code, new_password } = req.body;

  
  if (!isValidTokenOrCode(token_or_code)) {
    return res.status(400).json({ message: 'Invalid token or code' });
  }

  
  const decoded = jwt.verify(token_or_code, 'ecosync_secret'); 
  const userId = decoded.userId;

  
  bcrypt.hash(new_password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    
    pool.query('UPDATE Users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId], (error, updateResult) => {
      if (error) {
        console.error('Error updating database:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      console.log(userId);
      return res.status(200).json({ message: 'Password reset successful' });
    });
  });
});
function isValidTokenOrCode(tokenOrCode) {
  try {
    jwt.verify(tokenOrCode, 'ecosync_secret');
    return true;
  } catch (error) {
    return false;
  }
}

app.put('/auth/change-password', (req, res) => {
  const { userId, old_password, new_password } = req.body;
  // Fetch user's current password hash from the database
  pool.query('SELECT password_hash FROM Users WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if user exists
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordHash = results[0].password_hash;

    // Compare the provided old password with the hashed password in the database
    bcrypt.compare(old_password, passwordHash, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // If old password doesn't match, return 400 (Bad Request)
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }

      // Hash the new password
      bcrypt.hash(new_password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error('Error hashing password:', hashErr);
          return res.status(500).json({ message: 'Internal server error' });
        }
        if(old_password == new_password)
        {
          return res.status(400).json({ message: 'New password can not be old password' });
        }
        // Update the user's password in the database
        pool.query('UPDATE Users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId], (updateErr, updateResult) => {
          if (updateErr) {
            console.error('Error updating password:', updateErr);
            return res.status(500).json({ message: 'Internal server error' });
          }

          // Password changed successfully
          return res.status(200).json({ message: 'Password changed successfully' });
        });
      });
    });
  });
});

// GET /users endpoint
app.get('/users', (req, res) => {

  // Query to select all information from Users and corresponding roles from Roles
  const query = `
    SELECT u.*, GROUP_CONCAT(r.name) AS role
    FROM Users u
    LEFT JOIN User_Roles ur ON u.user_id = ur.user_id
    LEFT JOIN Roles r ON ur.role_id = r.role_id
    GROUP BY u.user_id;
  `;

  // Execute the query
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    // Prepare the response data
    const users = results.map(user => {
      return {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role // Roles represented as a string
      };
    });

    // Send the response with user data
    return res.status(200).json({ status: 'success', data: users });
  });
});



// Endpoint to retrieve specific user's details
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  // Query to fetch user details along with their role
  const query = `
    SELECT u.user_id, u.username, u.email, r.name AS role
    FROM Users u
    LEFT JOIN User_Roles ur ON u.user_id = ur.user_id
    LEFT JOIN Roles r ON ur.role_id = r.role_id
    WHERE u.user_id = ?
  `;

  // Execute the query
  pool.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If user not found
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format the response
    const userData = {
      userId: results[0].user_id,
      username: results[0].username,
      email : results[0].email,
      role: results[0].role
    };

    // Send the response
    return res.json(userData);
  });
});


app.post('/users', (req, res) => {
  let isvalid = false;
  const { username, email, password } = req.body;
    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Email must be from organization domain' });
    }
    else
    {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        const newUser = { username, email, password_hash: hashedPassword };
        pool.query('INSERT INTO Users SET ?', newUser, (error, results) => {
          if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ message: 'User already exists' });
            }
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }

          const adminRoleQuery = 'INSERT INTO User_Roles (user_id, role_id) VALUES (?, (SELECT role_id FROM Roles WHERE name = "Unassigned"))';
          pool.query(adminRoleQuery, [results.insertId], (roleError, roleResult) => {
            if (roleError) {
              console.error('Error assigning admin role:', roleError);
              return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('User created successfully:', results.insertId);
            return res.status(201).json({ message: `Secondary user '${username}' created successfully by System Admin` });
          });
        });
      });
    }
});

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email, password, role_id } = req.body;

  // Check if any of the fields are provided in the request body
  if (!username && !email && !password && !role_id) {
    return res.status(400).json({ message: 'At least one field must be provided for updating' });
  }

  let updateUserQuery = 'UPDATE Users SET ';
  let updateValues = [];
  let updateFields = [];

  // Check each field and add it to the update query if provided
  if (username) {
    updateFields.push('username = ?');
    updateValues.push(username);
  }
  if (email) {
    // Check if the provided email is from the echosync domain
    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Email must be from organization domain' });
    }
    updateFields.push('email = ?');
    updateValues.push(email);
  }
  if (password) {
    // Hash the new password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      updateFields.push('password_hash = ?');
      updateValues.push(hashedPassword);

      // Check if the role_id is provided
      if (role_id) {
        updateFields.push('role_id = ?');
        updateValues.push(role_id);
      }

      // Add the fields to the update query
      updateUserQuery += updateFields.join(', ');
      updateUserQuery += ' WHERE user_id = ?';
      updateValues.push(userId);

      // Execute the update query
      pool.query(updateUserQuery, updateValues, (error, result) => {
        if (error) {
          console.error('Error updating user details:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User details updated successfully' });
      });
    });
  }
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  // Check if the requesting user is authorized to perform this action (System Admin access)
  // You may need to implement authentication and authorization logic here
  
  // Delete associated records from user_roles table first
  pool.query('DELETE FROM User_Roles WHERE user_id = ?', [userId], (roleError, roleResult) => {
    if (roleError) {
      console.error('Error deleting user roles:', roleError);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Once user roles are deleted, delete the user from the Users table
    pool.query('DELETE FROM Users WHERE user_id = ?', [userId], (error, result) => {
      if (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    });
  });
});

// Change user roles endpoint
app.put('/users/:userId/roles', (req, res) => {
  const userId = req.params.userId;
  
  // Check if the 'role' field exists in the request body
  if (!req.body.role) {
    return res.status(400).json({ error: 'Role field must be provided' });
  }
  
  // Extract the role from the request body
  const roleName = req.body.role;

  // Fetch role_id from Roles table based on role name
  const selectRoleQuery = 'SELECT role_id FROM Roles WHERE name = ?';
  pool.query(selectRoleQuery, [roleName], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error fetching role ID:', selectErr);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (selectResult.length === 0) {
      console.error('Role not found:', roleName);
      return res.status(404).json({ error: `Role '${roleName}' not found` });
    }
    
    const roleId = selectResult[0].role_id;

    // Check if the user exists
    const selectUserQuery = 'SELECT * FROM Users WHERE user_id = ?';
    pool.query(selectUserQuery, [userId], (userErr, userResult) => {
      if (userErr) {
        console.error('Error checking user existence:', userErr);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (userResult.length === 0) {
        console.error('User not found:', userId);
        return res.status(404).json({ error: `User with ID '${userId}' not found` });
      }

      // Delete existing user role
      const deleteQuery = 'DELETE FROM User_Roles WHERE user_id = ?';
      pool.query(deleteQuery, [userId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting user role:', deleteErr);
          return res.status(500).json({ error: 'Internal server error' });
        }
        
        // Insert new user role
        const insertQuery = 'INSERT INTO User_Roles (user_id, role_id) VALUES (?, ?)';
        pool.query(insertQuery, [userId, roleId], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error inserting user role:', insertErr);
            return res.status(500).json({ error: 'Internal server error' });
          }
          console.log('User role updated successfully');
          return res.status(200).json({ message: 'User role updated successfully' });
        });
      });
    });
  });
});

app.get('/rbac/permissions', (req, res) => {
  pool.query('SELECT permission_id AS permissionId, name, description FROM Permissions', (error, results) => {
    if (error) {
      console.error('Error fetching permissions:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    return res.status(200).json({ status: 'success', data: results });
  });
});


app.get('/rbac/roles', (req, res) => {
  pool.query('SELECT * FROM Roles', (error, results) => {
    if (error) {
      console.error('Error fetching roles:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    
    if (results.length === 0) {
      return res.status(200).json({ status: 'success', data: [] });
    }

    
    return res.status(200).json({ status: 'success', data: results });
  });
});

// Endpoint for adding new roles
app.post('/rbac/roles', (req, res) => {
  const { role, description } = req.body;

  // Check if role and description are provided
  if (!role || !description) {
    return res.status(400).json({ message: 'Role and description must be provided' });
  }

  // Perform insertion into the Roles table
  pool.query('INSERT INTO Roles (name, description) VALUES (?, ?)', [role, description], (error, results) => {
    if (error) {
      console.error('Error adding new role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(201).json({ message: 'New Role added.' });
  });
});

// Endpoint for adding new permissions
app.post('/rbac/permissions', (req, res) => {
  const { permission, description } = req.body;

  // Check if permission and description are provided
  if (!permission || !description) {
    return res.status(400).json({ message: 'Permission and description must be provided' });
  }

  // Perform insertion into the Permissions table
  pool.query('INSERT INTO Permissions (name, description) VALUES (?, ?)', [permission, description], (error, results) => {
    if (error) {
      console.error('Error adding new permission:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(201).json({ message: 'New Permission added.' });
  });
});

// Endpoint for assigning permission to a role
app.post('/rbac/roles/:roleid/permissions', (req, res) => {
  const roleId = req.params.roleid;
  const { permissions } = req.body;
  // Check if roleId and permissions are provided
  if (!roleId || !permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ message: 'Role ID and an array of permissions must be provided' });
  }

  // Prepare an array to hold the values for the batch insert
  const values = permissions.map(permission => [roleId, permission]);

  // Perform batch insertion into the Role_Permissions table
  pool.query('INSERT INTO Role_Permissions (role_id, permission_id) SELECT ?, permission_id FROM Permissions WHERE name IN (?)', [roleId, permissions], (error, results) => {
    if (error) {
      console.error('Error assigning permissions to role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Permissions assigned to role were successful.' });
  });
});

app.get('/profile', (req, res) => {
  const userId = req.headers.userid;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Query to fetch user profile from the database
  const getUserProfileQuery = 'SELECT first_name, last_name, phone, address FROM Users WHERE user_id = ?';

  pool.query(getUserProfileQuery, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Extract user profile data from query results
    const userProfile = {
      first_name: results[0].first_name,
      last_name: results[0].last_name,
      phone: results[0].phone,
      address: results[0].address,
    };

    return res.status(200).json(userProfile);
  });
});

app.put('/profile', (req, res) => {
  const userId = req.headers.userid;
  const { first_name, last_name, Phone, Address } = req.body;

  // Check if any of the required fields are null or undefined
  if (!first_name || !last_name || !Phone || !Address || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  pool.query('UPDATE Users SET first_name = ?, last_name = ?, Phone = ?, Address = ? WHERE user_id = ?', 
      [first_name, last_name, Phone, Address, userId], 
      (error, result) => {
          if (error) {
              console.error('Error updating user profile:', error);
              return res.status(500).json({ message: 'Internal server error' });
          }

          // Check if any rows were affected by the update operation
          if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'User profile not found' });
          }

          // Return a success message
          return res.status(200).json({ message: 'User profile updated successfully' });
      }
  );
});


app.get('/roles/:roleId/permissions', (req, res) => {
  const { roleId } = req.params;

  // Prepare SQL query
  const sql = `SELECT Permissions.name as permission_name
               FROM Role_Permissions 
               JOIN Permissions ON Role_Permissions.permission_id = Permissions.permission_id 
               WHERE Role_Permissions.role_id = ?`;

  // Execute SQL query
  pool.query(sql, [roleId], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(200).json({ permissions: [] });
      return;
    }    

    // Extract permission names from query results
    const permissions = results.map(result => result.permission_name);
    // Send permissions as response
    res.status(200).json({ permissions });
  });
});

app.post('/vehicles', (req, res) => {
  const { VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded } = req.body;

  // Insert query
  const sql = `INSERT INTO Vehicles (VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded) 
               VALUES (?, ?, ?, ?, ?)`;

  // Execute the query
  pool.query(sql, [VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded], (err, result) => {
    if (err) {
      console.error('Error inserting vehicle:', err);
      res.status(500).send('Error inserting vehicle');
      return;
    }
    console.log('Vehicle inserted successfully');
    return res.status(200).json({ message: 'Vehicle inserted successfully' });
  });
});

app.get('/vehicles', (req, res) => {
  // Select query to fetch all vehicles with their corresponding STS ward numbers
  const sql = 'SELECT Vehicles.*, STSVehicles.WardNumber FROM Vehicles LEFT JOIN STSVehicles ON Vehicles.VehicleRegistrationNumber = STSVehicles.VehicleRegistrationNumber';

  // Execute the query
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching vehicles:', err);
      res.status(500).send('Error fetching vehicles');
      return;
    }
    // Send the fetched vehicles as JSON response
    res.status(200).json(result);
  });
});


// API Endpoint to insert STS ID to a vehicle
app.post('/sts-vehicles', (req, res) => {
  const { STSID, VehicleRegistrationNumber } = req.body;

  if (!STSID || !VehicleRegistrationNumber) {
    return res.status(400).json({ error: 'STS ID and Vehicle Registration Number are required' });
  }

  const sql = 'INSERT INTO STSVehicles (STSID, VehicleRegistrationNumber) VALUES (?, ?)';
  const values = [STSID, VehicleRegistrationNumber];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting STS ID to vehicle: ', err);
      return res.status(500).json({ error: 'Failed to insert STS ID to vehicle' });
    }
    console.log('STS ID inserted to vehicle successfully');
    res.status(200).json({ message: 'STS ID inserted to vehicle successfully' });
  });
});

// API Endpoint to insert STS data
app.post('/sts', (req, res) => {
  const { WardNumber, CapacityInTonnes, address, Longitude, Latitude } = req.body;

  if (!WardNumber || !CapacityInTonnes || !address || !Longitude || !Latitude) {
    return res.status(400).json({ error: 'WardNumber, CapacityInTonnes, address, Longitude, and Latitude are required' });
  }

  const sql = 'INSERT INTO STS (WardNumber, CapacityInTonnes, address, Longitude, Latitude) VALUES (?, ?, ?, ?, ?)';
  const values = [WardNumber, CapacityInTonnes, address, Longitude, Latitude];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting STS data: ', err);
      return res.status(500).json({ error: 'Failed to insert STS data' });
    }
    console.log('STS data inserted successfully');
    res.status(200).json({ message: 'STS data inserted successfully' });
  });
});

// Route handler to get all STS ward numbers
app.get('/sts/wardnumbers', (req, res) => {
  // Query to fetch all STS ward numbers from the database
  const sql = 'SELECT WardNumber FROM STS';

  // Execute the query
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching STS ward numbers:', err);
      return res.status(500).json({ error: 'Failed to fetch STS ward numbers' });
    }

    // Extract the ward numbers from the query results
    const wardNumbers = results.map(result => result.WardNumber);

    // Send the ward numbers as response
    res.json({ wardNumbers });
  });
});

app.post('/vehicle/:vehicleid', (req, res) => {
  const { vehicleid } = req.params;
  const { WardNumber } = req.body;

  if (!WardNumber || !vehicleid) {
    return res.status(400).json({ error: 'WardNumber and VehicleRegistrationNumber are required' });
  }

  // Query to insert data into STSVehicles table
  const sql = 'INSERT INTO STSVehicles (WardNumber, VehicleRegistrationNumber) VALUES (?, ?)';
  const values = [WardNumber, vehicleid];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into STSVehicles table:', err);
      return res.status(500).json({ error: 'Failed to insert data into STSVehicles table' });
    }
    console.log('Data inserted into STSVehicles table successfully');
    res.status(200).json({ message: 'Data inserted into STSVehicles table successfully' });
  });
});

app.get('/sts', (req, res) => {
  const sql = 'SELECT * FROM STS';

  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching STS data:', err);
      res.status(500).json({ error: 'Failed to fetch STS data' });
      return;
    }

    res.status(200).json(result);
  });
});

app.post('/landfills', (req, res) => {
  // Extract data from the request body
  const { LandfillID, capacity, operationalTimespan, address, longitude, latitude } = req.body;

  // Check if all required fields are provided
  if (!LandfillID || !capacity || !operationalTimespan || !address || !longitude || !latitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert query to add data into LandfillSites table
  const sql = 'INSERT INTO LandfillSites (LandfillID, Capacity, OperationalTimespan, address, Longitude, Latitude) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [LandfillID, capacity, operationalTimespan, address, longitude, latitude];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into LandfillSites table:', err);
      return res.status(500).json({ error: 'Failed to insert data into LandfillSites table' });
    }
    console.log('Data inserted into LandfillSites table successfully');
    res.status(200).json({ message: 'Data inserted into LandfillSites table successfully' });
  });
});

app.get('/landfills', (req, res) => {
  // Select query to fetch all data from LandfillSites table
  const sql = 'SELECT * FROM LandfillSites';

  // Execute the query
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from LandfillSites table:', err);
      return res.status(500).json({ error: 'Failed to fetch data from LandfillSites table' });
    }
    console.log('Data fetched from LandfillSites table successfully');
    res.status(200).json(result);
  });
});

app.post('/sts-entries', (req, res) => {
  const { WardNumber, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture } = req.body;

  // Check if all required fields are provided
  if (!WardNumber || !VehicleRegistrationNumber || !WeightOfWaste || !TimeOfArrival || !TimeOfDeparture) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert query to add data into STSEntries table
  const sql = 'INSERT INTO STSEntries (WardNumber, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture) VALUES (?, ?, ?, ?, ?)';
  const values = [WardNumber, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into STSEntries table:', err);
      return res.status(500).json({ error: 'Failed to insert data into STSEntries table' });
    }
    console.log('Data inserted into STSEntries table successfully');
    res.status(200).json({ message: 'Data inserted into STSEntries table successfully' });
  });
});

app.post('/landfill-entries', (req, res) => {
  const { LandfillID, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture } = req.body;

  // Check if all required fields are provided
  if (!LandfillID || !VehicleRegistrationNumber || !WeightOfWaste || !TimeOfArrival || !TimeOfDeparture) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert query to add data into LandfillEntries table
  const sql = 'INSERT INTO LandfillEntries (LandfillID, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture) VALUES (?, ?, ?, ?, ?)';
  const values = [LandfillID, VehicleRegistrationNumber, WeightOfWaste, TimeOfArrival, TimeOfDeparture];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into LandfillEntries table:', err);
      return res.status(500).json({ error: 'Failed to insert data into LandfillEntries table' });
    }
    console.log('Data inserted into LandfillEntries table successfully');
    res.status(200).json({ message: 'Data inserted into LandfillEntries table successfully' });
  });
});

app.post('/ward-number', (req, res) => {
  const { vehicleRegistrationNumber } = req.body;

  // Check if the vehicle registration number is provided
  if (!vehicleRegistrationNumber) {
    return res.status(400).json({ error: 'Vehicle registration number is required' });
  }

  // Query to fetch the ward number based on the vehicle registration number
  const sql = 'SELECT WardNumber FROM STSVehicles WHERE VehicleRegistrationNumber = ?';
  pool.query(sql, [vehicleRegistrationNumber], (error, results) => {
    if (error) {
      console.error('Error fetching ward number:', error);
      return res.status(500).json({ error: 'Failed to fetch ward number' });
    }

    // Check if a ward number was found
    if (results.length === 0) {
      return res.status(404).json({ error: 'Ward number not found for the provided vehicle registration number' });
    }

    // Extract the ward number from the result and send it in the response
    const wardNumber = results[0].WardNumber;
    res.status(200).json({ wardNumber });
  });
});

// API endpoint to fetch details based on WardNumber, LandfillID, and VehicleRegistrationNumber
app.post('/billing-calculation-details', (req, res) => {
  const { WardNumber, LandfillID, VehicleRegistrationNumber } = req.body;

  // Fetch details from the database based on input parameters
  const sql = `SELECT STS.Latitude AS WardLatitude, STS.Longitude AS WardLongitude,
                LandfillSites.Latitude AS LandfillLatitude, LandfillSites.Longitude AS LandfillLongitude,
                Vehicles.FuelCostPerKmLoaded, Vehicles.FuelCostPerKmUnloaded
                FROM STS
                JOIN LandfillSites ON STS.WardNumber = ?
                JOIN Vehicles ON LandfillSites.LandfillID = ?
                WHERE Vehicles.VehicleRegistrationNumber = ?`;

  pool.query(sql, [WardNumber, LandfillID, VehicleRegistrationNumber], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length > 0) {
        const { WardLatitude, WardLongitude, LandfillLatitude, LandfillLongitude, FuelCostPerKmLoaded, FuelCostPerKmUnloaded } = result[0];

        // Calculate distance between Ward and Landfill
        const dLat = LandfillLatitude - WardLatitude;
        const dLng = LandfillLongitude - WardLongitude;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(WardLatitude) * Math.cos(LandfillLatitude) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const calculatedDistance = 6371 * c; // Radius of the Earth in kilometers

        // Calculate per kilometer cost
        const perKilometerCost = parseFloat(FuelCostPerKmUnloaded) + (3 / 5) * (parseFloat(FuelCostPerKmLoaded) - parseFloat(FuelCostPerKmUnloaded));

        res.status(200).json({
          WardLatitude,
          WardLongitude,
          LandfillLatitude,
          LandfillLongitude,
          PerKilometerCost: perKilometerCost.toFixed(2),
          Distance: calculatedDistance.toFixed(2)
        });
      } else {
        res.status(404).json({ error: 'Details not found' });
      }
    }
  });
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
