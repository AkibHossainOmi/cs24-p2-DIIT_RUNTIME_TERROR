const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const emailService = require('../services/emailService');

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.createUser(username, email, hashedPassword);
    const token = jwt.sign({ userId: newUser.insertId }, 'ecosync_secret', { expiresIn: '5m' });
    res.status(200).json({
      message: `System Admin '${username}' created successfully`,
      token: token
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await UserModel.getUserByUsernameAndEmail(username, email);
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        res.status(401).json({ message: 'Incorrect credentials' });
      } else {
        const token = jwt.sign({ userId: user.user_id }, 'ecosync_secret', { expiresIn: '5m' });
        res.status(200).json({ message: 'Successfully logged in', token });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
  };

  exports.initiatePasswordReset = async (req, res) => {
    const { username_or_email } = req.body;
    try {
      const user = await UserModel.getUserByUsernameOrEmail(username_or_email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const userId = user.user_id;
      const token = jwt.sign({ userId }, 'ecosync_secret', { expiresIn: '5m' });
      
      emailService.sendPasswordResetToken(user.email, token, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending verification code email' });
        }
        
        console.log('Verification code email sent:', info.response);
        return res.status(200).json({ message: 'Verification code sent to email' });
      });
    } catch (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.confirmPasswordReset = async (req, res) => {
    const { token_or_code, new_password } = req.body;
  
    if (!isValidTokenOrCode(token_or_code)) {
      return res.status(400).json({ message: 'Invalid token or code' });
    }
  
    try {
      const decoded = jwt.verify(token_or_code, 'ecosync_secret');
      const userId = decoded.userId;
  
      const hashedPassword = await bcrypt.hash(new_password, 10);
      await UserModel.updatePassword(userId, hashedPassword);
  
      console.log(userId);
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  function isValidTokenOrCode(tokenOrCode) {
    try {
      jwt.verify(tokenOrCode, 'ecosync_secret');
      return true;
    } catch (error) {
      return false;
    }
  }

  exports.changePassword = async (req, res) => {
    const { userId, old_password, new_password } = req.body;
  
    try {
      const user = await UserModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(old_password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }
  
      if (old_password === new_password) {
        return res.status(400).json({ message: 'New password cannot be the same as the old password' });
      }
  
      const hashedPassword = await bcrypt.hash(new_password, 10);
      await UserModel.updatePassword(userId, hashedPassword);
  
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };