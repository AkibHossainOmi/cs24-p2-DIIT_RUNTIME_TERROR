import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

// Dummy STS data
const dummySTS = [
  { sts_word_number: 1, capacity: 100, address: 'Dummy Address 1' },
  { sts_word_number: 2, capacity: 200, address: 'Dummy Address 2' },
  { sts_word_number: 3, capacity: 150, address: 'Dummy Address 3' },
  { sts_word_number: 4, capacity: 180, address: 'Dummy Address 4' },
];

const AllSTS = () => {
  const [stsList, setSTSList] = useState([]);

  useEffect(() => {
    // Simulate fetching STS data from the backend
    setTimeout(() => {
      setSTSList(dummySTS);
    }, 1000); // Simulate 1 second delay
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
                  <p className="text-lg font-semibold text-black-500">{`STS Word Number: ${sts.sts_word_number}`}</p>
                  <p className="text-sm text-gray-600">{`Capacity: ${sts.capacity}, Address: ${sts.address}`}</p>
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
