import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const AssignTrucks = () => {
  const [selectedWard, setSelectedWard] = useState('');
  const [availableWards, setAvailableWards] = useState([]);

  const { VehicleRegistrationNumber } = useParams();
  console.log(VehicleRegistrationNumber);
  
  useEffect(() => {
    // Fetch STS ward numbers from the backend API
    const fetchWardNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/sts/wardnumbers');
        setAvailableWards(response.data.wardNumbers);
      } catch (error) {
        console.error('Error fetching STS ward numbers:', error);
      }
    };

    fetchWardNumbers();
  }, []);

  const handleWardSelect = (ward) => {
    setSelectedWard(ward);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to insert truck assignment
      await axios.post(`http://localhost:8000/vehicle/${VehicleRegistrationNumber}`, { WardNumber: selectedWard });
      console.log('Truck assigned successfully');
      // Reset form fields after submission
      setSelectedWard('');
    } catch (error) {
      console.error('Error assigning truck:', error);
    }
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
