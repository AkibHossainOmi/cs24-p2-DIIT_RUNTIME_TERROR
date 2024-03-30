import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

// Dummy landfill data with addresses in Dhaka North
const dummyLandfills = [
  { name: 'Landfill 1', capacity: 500, address: 'Dhaka North, Dummy Address 1', operational_timespan: '2020-2025' },
  { name: 'Landfill 2', capacity: 700, address: 'Dhaka North, Dummy Address 2', operational_timespan: '2018-2023' },
  { name: 'Landfill 3', capacity: 800, address: 'Dhaka North, Dummy Address 3', operational_timespan: '2019-2024' },
  { name: 'Landfill 4', capacity: 600, address: 'Dhaka North, Dummy Address 4', operational_timespan: '2022-2027' },
];

const AllLandfills = () => {
  const [landfillList, setLandfillList] = useState([]);

  useEffect(() => {
    // Simulate fetching landfill data from the backend
    setTimeout(() => {
      setLandfillList(dummyLandfills);
    }, 1000); // Simulate 1 second delay
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">All Landfills</h1>
            <div className="divide-y divide-gray-200">
              {landfillList.map((landfill, index) => (
                <div key={index} className="py-4">
                  <p className="text-lg font-semibold text-black-500">{`Landfill Name: ${landfill.name}`}</p>
                  <p className="text-sm text-gray-600">{`Capacity: ${landfill.capacity}, Address: ${landfill.address}`}</p>
                  <p className="text-sm text-gray-600">{`Operational Timespan: ${landfill.operational_timespan}`}</p>
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
