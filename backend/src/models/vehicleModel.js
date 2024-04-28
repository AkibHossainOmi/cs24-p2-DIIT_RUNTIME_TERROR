const pool = require('../config/database');

exports.createVehicle = (VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded) => {
  return new Promise((resolve, reject) => {
    // Insert query
    const sql = `INSERT INTO Vehicles (VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded) 
                 VALUES (?, ?, ?, ?, ?)`;

    // Execute the query
    pool.query(sql, [VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.getVehicles = () => {
    return new Promise((resolve, reject) => {
      // Select query to fetch all vehicles with their corresponding STS ward numbers
      const sql = 'SELECT Vehicles.*, STSVehicles.WardNumber FROM Vehicles LEFT JOIN STSVehicles ON Vehicles.VehicleRegistrationNumber = STSVehicles.VehicleRegistrationNumber';
  
      // Execute the query
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };