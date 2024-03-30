import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const AllSTS = () => {
  const [stsList, setSTSList] = useState([]);

  useEffect(() => {
    // Fetch STS data from the backend
    axios.get('http://localhost:8000/sts')
      .then(response => {
        setSTSList(response.data);
      })
      .catch(error => {
        console.error('Error fetching STS data:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">All STS</h1>
            <div className="divide-y divide-gray-200">
              {stsList.map((sts, index) => (
                <div key={index} className="py-4">
                  <p className="text-lg font-semibold text-black-500">{`STS Ward Number: ${sts.WardNumber}`}</p>
                  <p className="text-sm text-gray-600">{`Capacity: ${sts.CapacityInTonnes}, Address: ${sts.address}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSTS;
