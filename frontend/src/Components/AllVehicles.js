import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vehicles from the backend
    axios.get('http://localhost:8000/vehicles')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">All Vehicles</h1>
            <div className="divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <div key={vehicle.VehicleRegistrationNumber} className="py-4">
                  <Link to={`/vehicles/${vehicle.VehicleRegistrationNumber}`} className="text-lg font-semibold text-black-500 hover:underline">{`${vehicle.VehicleRegistrationNumber}`}</Link>
                  <p className="text-sm text-gray-600">{`Type: ${vehicle.Type}, Capacity: ${vehicle.Capacity}`}</p>
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
