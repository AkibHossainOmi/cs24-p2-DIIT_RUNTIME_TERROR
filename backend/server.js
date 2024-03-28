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
  host: 'ecosyncdb',
  user: 'root',
  password: '123456',
  database: 'ecosync',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/auth/create', (req, res) => {
  let isvalid = false;
  const { username, email, password } = req.body;
  emailValidator.check(email, function(error, response){
    isvalid = response
    if (!email.endsWith('@gmail.com') || !isvalid) {
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
  });
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

    
    const userId = results[0].userId;
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
  const userId = decoded.user_id;

  
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
  emailValidator.check(email, function(error, response){
    isvalid = response
    if (!email.endsWith('@gmail.com') || !isvalid) {
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
});

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email, password, roll_id } = req.body;

  // Check if any of the fields are provided in the request body
  if (!username && !email && !password && !roll_id) {
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

      // Check if the roll_id is provided
      if (roll_id) {
        updateFields.push('roll_id = ?');
        updateValues.push(roll_id);
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
app.post('/rbac/roles/:roleId/permissions', (req, res) => {
  const roleId = req.params.roleId;
  const { permission } = req.body;

  // Check if roleId and permission are provided
  if (!roleId || !permission) {
    return res.status(400).json({ message: 'Role ID and permission must be provided' });
  }

  // Perform insertion into the Role_Permissions table
  pool.query('INSERT INTO Role_Permissions (role_id, permission_id) VALUES (?, (SELECT permission_id FROM Permissions WHERE name = ?))', [roleId, permission], (error, results) => {
    if (error) {
      console.error('Error assigning permission to role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Permission assigned to role was successful.' });
  });
});

// Endpoint for assigning permission to a role
app.post('/rbac/roles/:roleId/permissions', (req, res) => {
  const roleId = req.params.roleId;
  const { permission } = req.body;

  // Check if roleId and permission are provided
  if (!roleId || !permission) {
    return res.status(400).json({ message: 'Role ID and permission must be provided' });
  }

  // Perform insertion into the Role_Permissions table
  pool.query('INSERT INTO Role_Permissions (role_id, permission_id) VALUES (?, (SELECT permission_id FROM Permissions WHERE name = ?))', [roleId, permission], (error, results) => {
    if (error) {
      console.error('Error assigning permission to role:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Permission assigned to role was successful.' });
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
      number: results[0].phone,
      address: results[0].address,
    };

    return res.status(200).json(userProfile);
  });
});

app.put('/profile', (req, res) => {
  const userId = req.headers.userId;
  const { first_name, last_name, Phone, Address } = req.body;

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



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
