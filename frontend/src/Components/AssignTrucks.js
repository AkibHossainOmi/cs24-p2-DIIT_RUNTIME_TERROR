import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AssignTrucks = ({ truckId }) => {
  const [selectedWard, setSelectedWard] = useState('');
  const availableWards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'];

  const handleWardSelect = (ward) => {
    setSelectedWard(ward);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit truck assignment to backend goes here
    console.log('Selected Ward:', selectedWard);
    console.log('Assigned Truck ID:', truckId);
    // Reset form fields after submission
    setSelectedWard('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700 pb-5">Assign Truck to STS</h2>
            <hr className="mb-4" />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Ward:</label>
                <select
                  value={selectedWard}
                  onChange={(e) => handleWardSelect(e.target.value)}
                  className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  required
                >
                  <option value="">Select Ward</option>
                  {availableWards.map(ward => (
                    <option key={ward} value={ward}>{ward}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Assign Truck
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTrucks;
