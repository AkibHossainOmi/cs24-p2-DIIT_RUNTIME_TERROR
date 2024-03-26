import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ReCAPTCHA from "react-google-recaptcha";
import { getCurrentUserId } from './Status';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [capVal, setCapval] = useState(null);
  const [expiryTime, setExpiryTime] = useState(300); // 5 minutes in seconds
  const [timer, setTimer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (passwordChanged) {
      setTimer(setTimeout(() => {
        setPasswordChanged(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setCapval(null);
        setExpiryTime(300);
        setError('');
      }, expiryTime * 1000));
    } else {
      clearTimeout(timer);
    }
  }, [passwordChanged, expiryTime]);

  const handlePasswordChange = async () => {
    if (!capVal) {
      setPasswordChanged(false);
      setError('Please complete the captcha.');
      return;
    }

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setPasswordChanged(false);
      setError('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChanged(false);
      setError('New passwords do not match. Please try again.');
      return;
    }

    try {
      // Make API call to change password
      const response = await fetch("http://localhost:8000/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: getCurrentUserId(),
          old_password: oldPassword,
          new_password: newPassword
        }),
      });

      if (response.ok) {
        setPasswordChanged(true);
      } else {
        setPasswordChanged(false);
        const responseData = await response.json();
        setError(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred while changing password:", error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">Change Password</h1>
            <hr className="mb-4" />
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Old Password:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password:</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <p className="block text-sm font-bold text-gray-700 mb-2">Are you human ?</p>
                <ReCAPTCHA
                  sitekey="6LeQuqQpAAAAAHnWRd82VGrq4A7ebMEf_w5YZNRV"
                  onChange={val => setCapval(val)}
                />
              {error && !passwordChanged && <p className="text-red-500 mt-2">{error}</p>}
              {passwordChanged && <p className="text-green-500 mt-2">Password changed successfully.</p>}
              </div>
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
