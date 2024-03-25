const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const emailValidator = require('email-existence');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
const port = 8000;
const isAuth = false;

app.use(express.json());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  
  console.log('Connected to MySQL database');

  connection.query('CREATE DATABASE IF NOT EXISTS ecosync', (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      connection.end();
      return;
    }

    console.log('Database "ecosync" created or already exists');

    connection.changeUser({ database: 'ecosync' }, err => {
      if (err) {
        console.error('Error changing to database ecosync:', err);
        connection.end();
        return;
      }

      console.log('Switched to database "ecosync"');

      const sqlQueries = fs.readFileSync('ecosync.sql', 'utf8');

      const queries = sqlQueries.split(';').filter(query => query.trim() !== '');

      queries.forEach(query => {
        connection.query(query, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          // console.log('Query executed successfully:', results);
        });
      });

      console.log('Database setup completed');
    });
  });
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
        connection.query('INSERT INTO Users SET ?', newUser, (error, results) => {
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
          connection.query(adminRoleQuery, [results.insertId], (roleError, roleResult) => {
            if (roleError) {
              console.error('Error assigning admin role:', roleError);
              return res.status(500).json({ message: 'Internal server error' });
            }

            console.log('Admin role assigned to user:', results.insertId);
            isAuth = true;
            // Send success response
            return res.status(201).json({ message: `System Admin '${username}' created successfully` });
          });
        });
      });
    }
  });
});


app.get('/rbac/permissions', (req, res) => {
  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  connection.query('SELECT permission_id AS permissionId, name, description FROM Permissions', (error, results) => {
    if (error) {
      console.error('Error fetching permissions:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    return res.status(200).json({ status: 'success', data: results });
  });
});


app.get('/rbac/roles', (req, res) => {
  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  connection.query('SELECT * FROM Roles', (error, results) => {
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

app.post('/auth/login', (req, res) => {
  const { username, email, password } = req.body;

  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  connection.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], (error, results) => {
      if (error) {
          console.error('Error fetching user:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }

      
      if (results.length === 0 || !bcrypt.compareSync(password, results[0].password_hash)) {
          return res.status(401).json({ message: 'Invalid username/email or password' });
      }

      
      const tokenPayload = {
          user_id: results[0].user_id,
          role: 'STS Manager' 
      };
      const token = jwt.sign(tokenPayload, 'ecosync_secret', { expiresIn: '1h' });

      
      return res.status(200).json({ token });
  });
});

app.post('/auth/logout', (req, res) => {
  isAuth = false;
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

  
  connection.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username_or_email, username_or_email], (error, results) => {
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

    
    connection.query('UPDATE Users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId], (error, updateResult) => {
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
  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Fetch user's current password hash from the database
  connection.query('SELECT password_hash FROM Users WHERE user_id = ?', [userId], (error, results) => {
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
        connection.query('UPDATE Users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId], (updateErr, updateResult) => {
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
  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Query users along with their roles from the database
  const query = `
    SELECT u.user_id AS userId, u.username, GROUP_CONCAT(r.name) AS roles
    FROM Users u
    LEFT JOIN User_Roles ur ON u.user_id = ur.user_id
    LEFT JOIN Roles r ON ur.role_id = r.role_id
    GROUP BY u.user_id;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    // Prepare the response data
    const users = results.map(user => {
      return {
        userId: user.userId,
        username: user.username,
        roles: user.roles ? user.roles.split(',') : [] // Convert roles string to array
      };
    });

    // Send the response with user data
    return res.status(200).json({ status: 'success', data: users });
  });
});

// Endpoint to retrieve specific user's details
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Query to fetch user details along with their roles
  const query = `
    SELECT u.user_id, u.username, GROUP_CONCAT(r.name) AS roles
    FROM Users u
    LEFT JOIN User_Roles ur ON u.user_id = ur.user_id
    LEFT JOIN Roles r ON ur.role_id = r.role_id
    WHERE u.user_id = ?
    GROUP BY u.user_id;
  `;

  // Execute the query
  connection.query(query, [userId], (error, results) => {
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
      roles: results[0].roles.split(',') // Convert roles string to array
    };

    // Send the response
    return res.json(userData);
  });
});

app.post('/users', (req, res) => {
  if (!isAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
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
        connection.query('INSERT INTO Users SET ?', newUser, (error, results) => {
          if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ message: 'User already exists' });
            }
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
    
          console.log('User created successfully:', results.insertId);
          return res.status(201).json({ message: `Secondary user '${username}' created successfully by System Admin` });
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
      connection.query(updateUserQuery, updateValues, (error, result) => {
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
