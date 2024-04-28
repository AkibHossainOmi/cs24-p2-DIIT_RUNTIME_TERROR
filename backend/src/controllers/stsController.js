const STSModel = require('../models/stsModel');

exports.addSTS = async (req, res) => {
  try {
    const { WardNumber, CapacityInTonnes, address, Longitude, Latitude } = req.body;

    if (!WardNumber || !CapacityInTonnes || !address || !Longitude || !Latitude) {
      return res.status(400).json({ error: 'WardNumber, CapacityInTonnes, address, Longitude, and Latitude are required' });
    }

    // Call the model function to add STS data
    await STSModel.addSTS(WardNumber, CapacityInTonnes, address, Longitude, Latitude);

    console.log('STS data inserted successfully');
    return res.status(200).json({ message: 'STS data inserted successfully' });
  } catch (error) {
    console.error('Error inserting STS data: ', error);
    return res.status(500).json({ error: 'Failed to insert STS data' });
  }
};