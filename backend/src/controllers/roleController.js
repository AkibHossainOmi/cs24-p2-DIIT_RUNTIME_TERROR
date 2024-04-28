const RoleModel = require('../models/roleModel');

exports.getRolePermissions = async (req, res) => {
  const { roleId } = req.params;

  try {
    // Get permissions for the specified role using RoleModel
    const permissions = await RoleModel.getRolePermissions(roleId);

    // Send permissions as response
    res.status(200).json({ permissions });
  } catch (error) {
    console.error('Error getting role permissions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};