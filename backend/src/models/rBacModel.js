const pool = require('../config/database');

exports.getPermissions = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT permission_id AS permissionId, name, description FROM Permissions', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getRoles = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Roles', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  exports.createRole = (role, description) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Roles (name, description) VALUES (?, ?)', [role, description], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  exports.createPermission = (permission, description) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Permissions (name, description) VALUES (?, ?)', [permission, description], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  exports.assignPermissionsToRole = (roleId, permissions) => {
    return new Promise((resolve, reject) => {
      // Prepare an array to hold the values for the batch insert
      const values = permissions.map(permission => [roleId, permission]);
  
      // Perform batch insertion into the Role_Permissions table
      pool.query('INSERT INTO Role_Permissions (role_id, permission_id) SELECT ?, permission_id FROM Permissions WHERE name IN (?)', [roleId, permissions], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };