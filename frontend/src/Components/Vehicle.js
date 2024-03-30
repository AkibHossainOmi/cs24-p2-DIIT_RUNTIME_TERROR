import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const VehicleProfile = () => {
  const { registrationNumber } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/vehicles/${registrationNumber}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setVehicle(data.data);
        } else {
          console.error('Error fetching vehicle details:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching vehicle details:', error);
      });
  }, [registrationNumber]);

  if (!vehicle) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto py-8 mt-10">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">Vehicle Profile</h1>
            <div className="pb-4">
              <p className="text-lg font-semibold">Registration Number:</p>
              <p>{vehicle.VehicleRegistrationNumber}</p>
            </div>
            <div className="pb-4">
              <p className="text-lg font-semibold">Make:</p>
              <p>{vehicle.Make}</p>
            </div>
            <div className="pb-4">
              <p className="text-lg font-semibold">Model:</p>
              <p>{vehicle.Model}</p>
            </div>
            <div className="pb-4">
              <p className="text-lg font-semibold">Year:</p>
              <p>{vehicle.Year}</p>
            </div>
            <div className="pb-4">
              <p className="text-lg font-semibold">STS ID:</p>
              <p>{vehicle.STSID}</p>
            </div>
            <div className="pb-4">
              <p className="text-lg font-semibold">Landfill ID:</p>
              <p>{vehicle.LandfillID}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleProfile;
