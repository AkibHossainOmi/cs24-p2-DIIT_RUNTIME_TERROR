const STSVehicleModel = require('../models/stsVehicleModel');

exports.addSTSVehicle = async (req, res) => {
  try {
    const { STSID, VehicleRegistrationNumber } = req.body;

    if (!STSID || !VehicleRegistrationNumber) {
      return res.status(400).json({ error: 'STS ID and Vehicle Registration Number are required' });
    }

    // Call the model function to add STS vehicle
    await STSVehicleModel.addSTSVehicle(STSID, VehicleRegistrationNumber);

    console.log('STS ID inserted to vehicle successfully');
    return res.status(200).json({ message: 'STS ID inserted to vehicle successfully' });
  } catch (error) {
    console.error('Error inserting STS ID to vehicle: ', error);
    return res.status(500).json({ error: 'Failed to insert STS ID to vehicle' });
  }
};