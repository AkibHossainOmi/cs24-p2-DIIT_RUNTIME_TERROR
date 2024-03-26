import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// Dummy vehicle data
const dummyVehicles = [
  { id: 1, vehicleNumber: 'ABC123', type: 'Open Truck', capacity: 3 },
  { id: 2, vehicleNumber: 'XYZ456', type: 'Dump Truck', capacity: 5 },
  { id: 3, vehicleNumber: 'DEF789', type: 'Compactor', capacity: 7 },
  { id: 4, vehicleNumber: 'GHI012', type: 'Container Carrier', capacity: 3 },
];

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Simulate fetching vehicles from the backend
    setTimeout(() => {
      setVehicles(dummyVehicles);
    }, 1000); // Simulate 1 second delay
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">All Vehicles</h1>
            <div className="divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="py-4">
                  <Link to={`/vehicle/${vehicle.id}`} className="text-lg font-semibold text-black-500 hover:underline">{`${vehicle.vehicleNumber}`}</Link>
                  <p className="text-sm text-gray-600">{`Type: ${vehicle.type}, Capacity: ${vehicle.capacity}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllVehicles;
