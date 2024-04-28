const pool = require('../config/database');

exports.getRolePermissions = (roleId) => {
  return new Promise((resolve, reject) => {
    // Prepare SQL query
    const sql = `SELECT Permissions.name as permission_name
                 FROM Role_Permissions 
                 JOIN Permissions ON Role_Permissions.permission_id = Permissions.permission_id 
                 WHERE Role_Permissions.role_id = ?`;

    // Execute SQL query
    pool.query(sql, [roleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // Extract permission names from query results
        const permissions = results.map(result => result.permission_name);
        resolve(permissions);
      }
    });
  });
};