import React, { useState } from 'react';
import Navbar from "./Navbar";

export default function AddVehiclePage() {
  const [vehicleData, setVehicleData] = useState({
    vehicle_number: '',
    type: '',
    capacity: '',
  });

  const [errors, setErrors] = useState({
    vehicle_number: '',
    type: '',
    capacity: '',
  });

  const handleInputChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { vehicle_number, type, capacity } = vehicleData;

    if (!vehicle_number.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vehicle_number: "Vehicle Number can't be empty",
      }));
      isValid = false;
    }

    // Similarly, add validation for other fields

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Perform submission logic here (e.g., API call)
    console.log('Vehicle data:', vehicleData);

    // Reset form after successful submission
    setVehicleData({
      vehicle_number: '',
      type: '',
      capacity: '',
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Add Vehicle
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_number">
              Vehicle Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.vehicle_number ? "border-red-500" : ""}`}
              id="vehicle_number"
              type="text"
              name="vehicle_number"
              value={vehicleData.vehicle_number}
              onChange={handleInputChange}
              placeholder="Vehicle Number"
            />
            {errors.vehicle_number && (
              <p className="text-red-500 text-xs italic">{errors.vehicle_number}</p>
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
              <option value="">Select a type</option>
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
              <option value="">Select a capacity</option>
              <option value="3 ton">3 ton</option>
              <option value="5 ton">5 ton</option>
              <option value="7 ton">7 ton</option>
            </select>
            {errors.capacity && (
              <p className="text-red-500 text-xs italic">{errors.capacity}</p>
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