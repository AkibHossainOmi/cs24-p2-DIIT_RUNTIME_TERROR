const VehicleModel = require('../models/vehicleModel');

exports.createVehicle = async (req, res) => {
  const { VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded } = req.body;

  try {
    // Create the vehicle using VehicleModel
    await VehicleModel.createVehicle(VehicleRegistrationNumber, Type, Capacity, FuelCostPerKmLoaded, FuelCostPerKmUnloaded);
    console.log('Vehicle inserted successfully');
    return res.status(200).json({ message: 'Vehicle inserted successfully' });
  } catch (error) {
    console.error('Error inserting vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getVehicles = async (req, res) => {
    try {
      // Fetch vehicles using VehicleModel
      const vehicles = await VehicleModel.getVehicles();
      return res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };