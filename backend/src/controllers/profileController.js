const ProfileModel = require('../models/profileModel');

exports.getUserProfile = async (req, res) => {
  const userId = req.headers.userid;
  
  try {
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch user profile from the database
    const userProfile = await ProfileModel.getUserProfile(userId);
    
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
    const userId = req.headers.userid;
    const { first_name, last_name, phone, address } = req.body;
  
    try {
      // Check if any of the required fields are missing
      if (!first_name || !last_name || !phone || !address || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Update user profile using ProfileModel
      const result = await ProfileModel.updateUserProfile(userId, first_name, last_name, phone, address);
  
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      // Return a success message
      return res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };