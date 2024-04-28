const pool = require('../config/database');

exports.getUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    // Query to fetch user profile from the database
    const getUserProfileQuery = 'SELECT first_name, last_name, phone, address FROM Users WHERE user_id = ?';

    pool.query(getUserProfileQuery, [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          const userProfile = {
            first_name: results[0].first_name,
            last_name: results[0].last_name,
            phone: results[0].phone,
            address: results[0].address,
          };
          resolve(userProfile);
        }
      }
    });
  });
};

exports.updateUserProfile = (userId, first_name, last_name, phone, address) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE Users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE user_id = ?', 
        [first_name, last_name, phone, address, userId], 
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  };