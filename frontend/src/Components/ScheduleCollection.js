import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const ScheduleCollection = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    neighborhoods: '',
    collectionStartTime: '',
    collectionEndTime: '',
    stsWardNumber: '',
    stsCollectionHours: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement logic to suggest schedule based on optimization criteria
      console.log('Suggested schedule:', formData);
      // You can send this data to backend for further processing if needed
    } catch (error) {
      console.error('Error suggesting schedule:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Schedule Waste Collection</h1>
        <form className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="neighborhoods">
              Neighborhoods
            </label>
            <input
              id="neighborhoods"
              type="text"
              name="neighborhoods"
              value={formData.neighborhoods}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionStartTime">
              Collection Start Time
            </label>
            <input
              id="collectionStartTime"
              type="time"
              name="collectionStartTime"
              value={formData.collectionStartTime}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collectionEndTime">
              Collection End Time
            </label>
            <input
              id="collectionEndTime"
              type="time"
              name="collectionEndTime"
              value={formData.collectionEndTime}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stsWardNumber">
              STS Ward Number
            </label>
            <input
              id="stsWardNumber"
              type="text"
              name="stsWardNumber"
              value={formData.stsWardNumber}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stsCollectionHours">
              STS Collection Hours
            </label>
            <input
              id="stsCollectionHours"
              type="text"
              name="stsCollectionHours"
              value={formData.stsCollectionHours}
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
              Generate Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCollection;
