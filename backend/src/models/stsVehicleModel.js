const pool = require('../config/database');

exports.addSTSVehicle = (STSID, VehicleRegistrationNumber) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO STSVehicles (STSID, VehicleRegistrationNumber) VALUES (?, ?)';
    const values = [STSID, VehicleRegistrationNumber];

    pool.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};