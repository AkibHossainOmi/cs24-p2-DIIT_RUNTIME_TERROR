const pool = require('../config/database');

exports.createUser = (username, email, passwordHash) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO Users SET ?', { username, email, password_hash: passwordHash }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getUserByUsernameAndEmail = (username, email) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Users WHERE username = ? AND email = ?', [username, email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };

  exports.getUserByUsernameOrEmail = (usernameOrEmail) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };

  exports.updatePassword = (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE Users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId], (error, updateResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(updateResult);
        }
      });
    });
  };

  exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Users WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };
  
  exports.updatePassword = (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE Users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId], (error, updateResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(updateResult);
        }
      });
    });
  };

  exports.getAllUsersWithRoles = () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT u.*, GROUP_CONCAT(r.name) AS role
        FROM Users u
        LEFT JOIN User_Roles ur ON u.user_id = ur.user_id
        LEFT JOIN Roles r ON ur.role_id = r.role_id
        GROUP BY u.user_id;
      `;
  
      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const users = results.map(user => {
            return {
              userId: user.user_id,
              username: user.username,
              email: user.email,
              role: user.role
            };
          });
          resolve(users);
        }
      });
    });
  };

  exports.getUserWithRoleById = (userId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT u.user_id, u.username, u.email, r.name AS role
        FROM Users u
        LEFT JOIN User_Roles ur ON u.user_id = ur.user_id
        LEFT JOIN Roles r ON ur.role_id = r.role_id
        WHERE u.user_id = ?
      `;
  
      pool.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  };

  exports.assignRole = (userId, roleName) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO User_Roles (user_id, role_id) VALUES (?, (SELECT role_id FROM Roles WHERE name = ?))', [userId, roleName], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  exports.updateUser = (userId, updateData) => {
    return new Promise((resolve, reject) => {
      const updateUserQuery = 'UPDATE Users SET ? WHERE user_id = ?';
      pool.query(updateUserQuery, [updateData, userId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows === 0) {
            resolve(null);
          } else {
            resolve(result);
          }
        }
      });
    });
  };

  exports.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      // Delete user roles first
      pool.query('DELETE FROM User_Roles WHERE user_id = ?', [userId], (roleError, roleResult) => {
        if (roleError) {
          reject(roleError);
        }
  
        // Once user roles are deleted, delete the user from the Users table
        pool.query('DELETE FROM Users WHERE user_id = ?', [userId], (error, result) => {
          if (error) {
            reject(error);
          }
  
          if (result.affectedRows === 0) {
            resolve(null); // User not found
          }
  
          resolve(result);
        });
      });
    });
  };

  exports.getRoleIdByName = (roleName) => {
    return new Promise((resolve, reject) => {
      const selectRoleQuery = 'SELECT role_id FROM Roles WHERE name = ?';
      pool.query(selectRoleQuery, [roleName], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            resolve(result[0].role_id);
          }
        }
      });
    });
  };
  
  exports.updateUserRole = (userId, roleId) => {
    return new Promise((resolve, reject) => {
      // Delete existing user role
      const deleteQuery = 'DELETE FROM User_Roles WHERE user_id = ?';
      pool.query(deleteQuery, [userId], (deleteError, deleteResult) => {
        if (deleteError) {
          reject(deleteError);
        }
  
        // Insert new user role
        const insertQuery = 'INSERT INTO User_Roles (user_id, role_id) VALUES (?, ?)';
        pool.query(insertQuery, [userId, roleId], (insertError, insertResult) => {
          if (insertError) {
            reject(insertError);
          }
  
          resolve();
        });
      });
    });
  };