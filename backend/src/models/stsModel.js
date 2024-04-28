const pool = require('../config/database');

exports.addSTS = (WardNumber, CapacityInTonnes, address, Longitude, Latitude) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO STS (WardNumber, CapacityInTonnes, address, Longitude, Latitude) VALUES (?, ?, ?, ?, ?)';
    const values = [WardNumber, CapacityInTonnes, address, Longitude, Latitude];

    pool.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};