import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateCollectionPlan = () => {
  const [formData, setFormData] = useState({
    area: '',
    startTime: '',
    duration: '',
    numLaborers: '',
    numVans: '',
    expectedWeight: ''
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
      const response = await axios.post('http://localhost:8000/create-collection-plan', formData);
      console.log('Collection plan created successfully:', response.data);
      // Reset form after successful submission
      setFormData({
        area: '',
        startTime: '',
        duration: '',
        numLaborers: '',
        numVans: '',
        expectedWeight: ''
      });
    } catch (error) {
      console.error('Error creating collection plan:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Create Collection Plan</h1>
        <form className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
              Area of Collection
            </label>
            <input
              id="area"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
              Collection Start Time
            </label>
            <input
              id="startTime"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration for Collection (in hours)
            </label>
            <input
              id="duration"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numLaborers">
              Number of Laborers
            </label>
            <input
              id="numLaborers"
              type="number"
              name="numLaborers"
              value={formData.numLaborers}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numVans">
              Number of Vans
            </label>
            <input
              id="numVans"
              type="number"
              name="numVans"
              value={formData.numVans}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expectedWeight">
              Expected Weight of Daily Solid Waste (in tons)
            </label>
            <input
              id="expectedWeight"
              type="number"
              name="expectedWeight"
              value={formData.expectedWeight}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Add other input fields similarly */}
          <div className="flex justify-between items-center mb-4">
            
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Plan
            </button>
            <Link to="/all_plan">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Show All Plans
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionPlan;
