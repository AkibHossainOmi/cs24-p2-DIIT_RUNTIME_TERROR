import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const AllLandfills = () => {
  const [landfillList, setLandfillList] = useState([]);

  useEffect(() => {
    // Fetch landfill data from the backend
    axios.get('http://localhost:8000/landfills')
      .then(response => {
        setLandfillList(response.data);
      })
      .catch(error => {
        console.error('Error fetching landfills:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700   mb-4">All Landfills</h1>
            <div className="divide-y divide-gray-200">
              {landfillList.map((landfill, index) => (
                <div key={index} className="py-4">
                  <p className="text-lg font-semibold text-black-500">{`Landfill ID: ${landfill.LandfillID}`}</p>
                  <p className="text-sm text-gray-600">{`Capacity: ${landfill.Capacity}, Address: ${landfill.address}`}</p>
                  <p className="text-sm text-gray-600">{`Operational Timespan: ${landfill.OperationalTimespan}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLandfills;
