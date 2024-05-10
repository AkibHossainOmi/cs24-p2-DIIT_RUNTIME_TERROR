import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const EnterWorkingHours = () => {
  const [formData, setFormData] = useState({
    loginTime: '',
    logoutTime: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/working-hours', formData);
      console.log('Working hours entry submitted successfully:', response.data);
      // Clear form data after successful submission
      setFormData({
        loginTime: '',
        logoutTime: '',
      });
    } catch (error) {
      console.error('Error submitting working hours entry:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Enter Working Hours</h1>
        <form className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginTime">
              Login Time
            </label>
            <input
              id="loginTime"
              type="datetime-local"
              name="loginTime"
              value={formData.loginTime}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logoutTime">
              Logout Time
            </label>
            <input
              id="logoutTime"
              type="datetime-local"
              name="logoutTime"
              value={formData.logoutTime}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterWorkingHours;
