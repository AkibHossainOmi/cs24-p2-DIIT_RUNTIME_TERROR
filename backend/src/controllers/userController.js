const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsersWithRoles();
    return res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await UserModel.getUserWithRoleById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userData = {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
      };
  
      return res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if email is from organization domain
      if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: 'Email must be from organization domain' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      await UserModel.createUser(username, email, hashedPassword);
  
      // Assign default role to the user
      await UserModel.assignRole(userId, 'Unassigned');
  
      console.log('User created successfully');
      return res.status(201).json({ message: `Secondary user '${username}' created successfully by System Admin` });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'User already exists' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { username, email, password, role_id } = req.body;
  
    // Check if any of the fields are provided in the request body
    if (!username && !email && !password && !role_id) {
      return res.status(400).json({ message: 'At least one field must be provided for updating' });
    }
  
    try {
      const user = await UserModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updateData = {};
      if (username) {
        updateData.username = username;
      }
      if (email) {
        // Check if the provided email is from the organization domain
        if (!email.endsWith('@gmail.com')) {
          return res.status(400).json({ message: 'Email must be from organization domain' });
        }
        updateData.email = email;
      }
      if (password) {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password_hash = hashedPassword;
      }
      if (role_id) {
        updateData.role_id = role_id;
      }
  
      await UserModel.updateUser(userId, updateData);
  
      return res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
      console.error('Error updating user details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Delete user and associated roles
      const deletedUser = await UserModel.deleteUser(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateUserRole = async (req, res) => {
    const userId = req.params.userId;
    const roleName = req.body.role;
  
    try {
      // Check if the 'role' field exists in the request body
      if (!roleName) {
        return res.status(400).json({ error: 'Role field must be provided' });
      }
  
      // Fetch role_id from Roles table based on role name
      const roleId = await UserModel.getRoleIdByName(roleName);
      if (!roleId) {
        return res.status(404).json({ error: `Role '${roleName}' not found` });
      }
  
      // Check if the user exists
      const user = await UserModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: `User with ID '${userId}' not found` });
      }
  
      // Update user role
      await UserModel.updateUserRole(userId, roleId);
  
      console.log('User role updated successfully');
      return res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error('Error updating user role:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };