import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const WastageEntry = () => {
  const [formData, setFormData] = useState({
    dateTime: '',
    amountCollected: '',
    contractorId: '',
    wasteType: '', 
    designatedSTS: '',
    vehicleUsed: '', // Updated to hold the selected vehicle used
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
      const response = await axios.post('http://localhost:8000/wastage-entries', formData);
      console.log('Wastage entry submitted successfully:', response.data);
      // Clear form data after successful submission
      setFormData({
        dateTime: '',
        amountCollected: '',
        contractorId: '',
        wasteType: '',
        designatedSTS: '',
        vehicleUsed: '',
      });
    } catch (error) {
      console.error('Error submitting wastage entry:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Wastage Entry</h1>
        <form className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">
              Time and Date of Collection
            </label>
            <input
              id="dateTime"
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amountCollected">
              Amount of Waste Collected (kg)
            </label>
            <input
              id="amountCollected"
              type="number"
              name="amountCollected"
              value={formData.amountCollected}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractorId">
              Contractor ID
            </label>
            <input
              id="contractorId"
              type="text"
              name="contractorId"
              value={formData.contractorId}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wasteType">
              Type of Waste Collected
            </label>
            <select
              id="wasteType"
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Waste Type</option>
              <option value="Domestic">Domestic</option>
              <option value="Plastic">Plastic</option>
              <option value="Construction Waste">Construction Waste</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designatedSTS">
              Designated STS for Deposit
            </label>
            <input
              id="designatedSTS"
              type="text"
              name="designatedSTS"
              value={formData.designatedSTS}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleUsed">
              Vehicle Used for Transportation
            </label>
            <select
              id="vehicleUsed"
              name="vehicleUsed"
              value={formData.vehicleUsed}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Vehicle Used</option>
              <option value="Rickshaw">Rickshaw</option>
              <option value="Van">Van</option>
              <option value="Mini Truck">Mini Truck</option>
            </select>
          </div>
          <div className="flex justify-between"> {/* Adjusted to use flex */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <Link to="/all-entries"> {/* Link to the All Entries page */}
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                All Entries
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WastageEntry;
