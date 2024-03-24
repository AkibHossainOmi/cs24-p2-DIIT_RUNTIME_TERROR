const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const emailValidator = require('email-existence');

const app = express();
const port = 8000;

app.use(express.json());


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

  // Check if the database exists, if not, create it
  connection.query('CREATE DATABASE IF NOT EXISTS echosync', (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      connection.end(); // Close the connection
      return;
    }

    console.log('Database "echosync" created or already exists');

    // Switch to the echosync database
    connection.changeUser({ database: 'echosync' }, err => {
      if (err) {
        console.error('Error changing to database echosync:', err);
        connection.end(); // Close the connection
        return;
      }

      console.log('Switched to database "echosync"');

      // Read the SQL file
      const sqlQueries = fs.readFileSync('echosync.sql', 'utf8');

      // Split the SQL file into individual queries
      const queries = sqlQueries.split(';').filter(query => query.trim() !== '');

      // Execute each query
      queries.forEach(query => {
        connection.query(query, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          console.log('Query executed successfully:', results);
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
    if (!email.endsWith('@diit.edu.bd') || !isvalid) {
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
    
          connection.query('SELECT permission_id FROM Permissions', (error, permissions) => {
            if (error) {
              console.error('Error fetching permissions:', error);
              return res.status(500).json({ message: 'Internal server error' });
            }
    
            const userPermissions = permissions.map(permission => [results.insertId, permission.permission_id]);
    
            if (userPermissions.length === 0) {
              console.log('No permissions to grant');
              return res.status(201).json({ message: `System Admin '${username}' created successfully` });
            }
    
            connection.query('INSERT INTO User_Permissions (user_id, permission_id) VALUES ?', [userPermissions], (error, result) => {
              if (error) {
                console.error('Error granting permissions:', error);
                return res.status(500).json({ message: 'Internal server error' });
              }
    
              console.log('Permissions granted to user:', result.affectedRows);
              return res.status(201).json({ message: `System Admin '${username}' created successfully` });
            });
          });
        });
      });
    }
});
});

app.get('/rbac/permissions', (req, res) => {
  connection.query('SELECT permission_id AS permissionId, name, description FROM Permissions', (error, results) => {
    if (error) {
      console.error('Error fetching permissions:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    return res.status(200).json({ status: 'success', data: results });
  });
});

// POST endpoint to define a new permission
app.post('/rbac/permissions', (req, res) => {
  const { name, description } = req.body;

  // Check if all required fields are provided
  if (!name || !description) {
    return res.status(400).json({ status: 'error', message: 'Name and description are required' });
  }

  // Insert the new permission into the database
  connection.query('INSERT INTO Permissions (name, description) VALUES (?, ?)', [name, description], (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ status: 'error', message: 'Permission name already exists' });
      }
      console.error('Error creating permission:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    console.log('Permission created successfully:', results.insertId);
    return res.status(201).json({ status: 'success', message: 'Permission created successfully', permissionId: results.insertId });
  });
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
