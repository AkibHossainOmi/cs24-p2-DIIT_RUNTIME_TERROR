const RBACModel = require('../models/rBacModel');

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await RBACModel.getPermissions();
    return res.status(200).json({ status: 'success', data: permissions });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await RBACModel.getRoles();
    return res.status(200).json({ status: 'success', data: roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.createRole = async (req, res) => {
  const { role, description } = req.body;

  try {
    // Check if role and description are provided
    if (!role || !description) {
      return res.status(400).json({ message: 'Role and description must be provided' });
    }

    // Perform insertion into the Roles table
    await RBACModel.createRole(role, description);
    
    return res.status(201).json({ message: 'New Role added.' });
  } catch (error) {
    console.error('Error adding new role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createPermission = async (req, res) => {
  const { permission, description } = req.body;

  try {
    // Check if permission and description are provided
    if (!permission || !description) {
      return res.status(400).json({ message: 'Permission and description must be provided' });
    }

    // Perform insertion into the Permissions table
    await RBACModel.createPermission(permission, description);
    
    return res.status(201).json({ message: 'New Permission added.' });
  } catch (error) {
    console.error('Error adding new permission:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.assignPermissionsToRole = async (req, res) => {
  const roleId = req.params.roleId;
  const { permissions } = req.body;

  try {
    // Check if roleId and permissions are provided
    if (!roleId || !permissions || !Array.isArray(permissions)) {
      return res.status(400).json({ message: 'Role ID and an array of permissions must be provided' });
    }

    // Perform batch insertion into the Role_Permissions table
    await RBACModel.assignPermissionsToRole(roleId, permissions);
    
    return res.status(200).json({ message: 'Permissions assigned to role were successful.' });
  } catch (error) {
    console.error('Error assigning permissions to role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};