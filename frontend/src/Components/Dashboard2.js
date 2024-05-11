import React from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
  // Dummy contractor data
  const dummyContractors = [
    { id: 1, name: 'Contractor A', currentDuty: 'Collecting waste', progress: 50 },
    { id: 2, name: 'Contractor B', currentDuty: 'Transporting waste', progress: 75 },
    { id: 3, name: 'Contractor C', currentDuty: 'Sorting waste', progress: 30 },
    { id: 4, name: 'Contractor D', currentDuty: 'Collecting waste', progress: 60 },
    { id: 5, name: 'Contractor E', currentDuty: 'Transporting waste', progress: 80 },
    { id: 6, name: 'Contractor F', currentDuty: 'Sorting waste', progress: 40 },
    { id: 7, name: 'Contractor G', currentDuty: 'Collecting waste', progress: 70 },
    { id: 8, name: 'Contractor H', currentDuty: 'Transporting waste', progress: 85 },
    { id: 9, name: 'Contractor I', currentDuty: 'Sorting waste', progress: 45 },
    { id: 10, name: 'Contractor J', currentDuty: 'Collecting waste', progress: 55 },
    { id: 11, name: 'Contractor K', currentDuty: 'Transporting waste', progress: 90 },
    { id: 12, name: 'Contractor L', currentDuty: 'Sorting waste', progress: 35 },
    { id: 13, name: 'Contractor M', currentDuty: 'Collecting waste', progress: 65 },
    { id: 14, name: 'Contractor N', currentDuty: 'Transporting waste', progress: 70 },
    { id: 15, name: 'Contractor O', currentDuty: 'Sorting waste', progress: 50 },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Display contractor cards */}
          {dummyContractors.map((contractor) => (
            <div key={contractor.id} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{contractor.name}</h2>
              <p className="text-sm text-gray-600">Current Duty: {contractor.currentDuty}</p>
              <p className="text-sm text-gray-600">Progress: {contractor.progress}%</p>
              {/* Add more performance indicators as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
