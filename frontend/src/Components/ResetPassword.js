import React, { useState } from 'react';
import Navbar from './Navbar';

export default function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetTokenChange = (e) => {
    setResetToken(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      setResetStatus('Please enter the reset token.');
      return;
    }

    if (password !== confirmPassword) {
      setResetStatus("Passwords don't match.");
      return;
    }

    try {
      // Send the password reset request to the backend
      const response = await fetch('http://localhost:8000/auth/reset-password/confirm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token_or_code: resetToken, new_password: password }),
      });

      if (response.ok) {
        // Password reset successful
        setResetStatus('Password reset successful. You can now log in with your new password.');
      } else {
        // Password reset failed
        const data = await response.json();
        setResetStatus(data.message || 'Password reset failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during password reset:', error);
      // Handle unexpected errors, e.g., network issues
      setResetStatus('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700  ">
          Reset Password
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="resetToken" className="block text-sm font-semibold text-gray-800">
              Reset Token
            </label>
            <input
              type="text"
              name="resetToken"
              value={resetToken}
              onChange={handleResetTokenChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Reset Password
            </button>
          </div>
        </form>
        {resetStatus && <p className="mt-4 text-sm text-purple-600">{resetStatus}</p>}
      </div>
    </div>
  );
}
