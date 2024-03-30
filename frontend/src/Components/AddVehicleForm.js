import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';

export default function AddVehiclePage() {
  const [vehicleData, setVehicleData] = useState({
    vehicleRegistrationNumber: '',
    type: '',
    capacity: '',
    fuelCostPerKmLoaded: '',
    fuelCostPerKmUnloaded: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather all the data
    const dataToSubmit = {
      VehicleRegistrationNumber: vehicleData.vehicleRegistrationNumber,
      Type: vehicleData.type,
      Capacity: vehicleData.capacity,
      FuelCostPerKmLoaded: vehicleData.fuelCostPerKmLoaded,
      FuelCostPerKmUnloaded: vehicleData.fuelCostPerKmUnloaded,
    };
    // Post data to the API
    axios.post('http://localhost:8000/vehicles', dataToSubmit)
      .then(response => {
        console.log(response.data);
        // Reset form fields and errors
        setVehicleData({
          vehicleRegistrationNumber: '',
          type: '',
          capacity: '',
          fuelCostPerKmLoaded: '',
          fuelCostPerKmUnloaded: '',
        });
        setErrors({});
        // Optionally, you can show a success message or redirect to another page
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          console.error('Error adding vehicle:', error.message);
        }
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h2 className="text-3xl font-semibold text-center text-purple-700 underline mb-2">
          Add Vehicle
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleRegistrationNumber">
              Vehicle Registration Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.vehicleRegistrationNumber ? "border-red-500" : ""}`}
              id="vehicleRegistrationNumber"
              type="text"
              name="vehicleRegistrationNumber"
              value={vehicleData.vehicleRegistrationNumber}
              onChange={handleInputChange}
              placeholder="Vehicle Registration Number"
            />
            {errors.vehicleRegistrationNumber && (
              <p className="text-red-500 text-xs italic">{errors.vehicleRegistrationNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <select
              className={`block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.type ? "border-red-500" : ""}`}
              id="type"
              name="type"
              value={vehicleData.type}
              onChange={handleInputChange}
            >
              <option value="">Select a Type</option>
              <option value="Open Truck">Open Truck</option>
              <option value="Dump Truck">Dump Truck</option>
              <option value="Compactor">Compactor</option>
              <option value="Container Carrier">Container Carrier</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs italic">{errors.type}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Capacity
            </label>
            <select
              className={`block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.capacity ? "border-red-500" : ""}`}
              id="capacity"
              name="capacity"
              value={vehicleData.capacity}
              onChange={handleInputChange}
            >
              <option value="">Select a Capacity</option>
              <option value="3">3 ton</option>
              <option value="5">5 ton</option>
              <option value="7">7 ton</option>
            </select>
            {errors.capacity && (
              <p className="text-red-500 text-xs italic">{errors.capacity}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuelCostPerKmLoaded">
              Fuel Cost per Kilometer - Fully Loaded
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fuelCostPerKmLoaded ? "border-red-500" : ""}`}
              id="fuelCostPerKmLoaded"
              type="text"
              name="fuelCostPerKmLoaded"
              value={vehicleData.fuelCostPerKmLoaded}
              onChange={handleInputChange}
              placeholder="Fuel Cost per Kilometer - Fully Loaded"
            />
            {errors.fuelCostPerKmLoaded && (
              <p className="text-red-500 text-xs italic">{errors.fuelCostPerKmLoaded}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuelCostPerKmUnloaded">
              Fuel Cost per Kilometer - Unloaded
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fuelCostPerKmUnloaded ? "border-red-500" : ""}`}
              id="fuelCostPerKmUnloaded"
              type="text"
              name="fuelCostPerKmUnloaded"
              value={vehicleData.fuelCostPerKmUnloaded}
              onChange={handleInputChange}
              placeholder="Fuel Cost per Kilometer - Unloaded"
            />
            {errors.fuelCostPerKmUnloaded && (
              <p className="text-red-500 text-xs italic">{errors.fuelCostPerKmUnloaded}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
