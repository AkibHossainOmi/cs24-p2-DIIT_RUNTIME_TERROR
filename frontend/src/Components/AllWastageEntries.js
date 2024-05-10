import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const AllWastageEntries = () => {
  const [wastageEntries, setWastageEntries] = useState([]);

  useEffect(() => {
    // Fetch wastage entries data from the backend
    axios.get('http://localhost:8000/wastage-entries')
      .then(response => {
        setWastageEntries(response.data);
      })
      .catch(error => {
        console.error('Error fetching wastage entries data:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 mb-4">All Wastage Entries</h1>
            <div className="divide-y divide-gray-200">
              {wastageEntries.map((entry, index) => (
                <div key={index} className="py-4">
                  <p className="text-lg font-semibold text-black-500">{`Time and Date of Collection: ${entry.dateTime}`}</p>
                  <p className="text-sm text-gray-600">{`Amount Collected: ${entry.amountCollected} kg`}</p>
                  <p className="text-sm text-gray-600">{`Contractor ID: ${entry.contractorId}`}</p>
                  <p className="text-sm text-gray-600">{`Type of Waste Collected: ${entry.wasteType}`}</p>
                  <p className="text-sm text-gray-600">{`Designated STS for Deposit: ${entry.designatedSTS}`}</p>
                  <p className="text-sm text-gray-600">{`Vehicle Used for Transportation: ${entry.vehicleUsed}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWastageEntries;
