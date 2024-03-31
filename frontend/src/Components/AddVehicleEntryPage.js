import React, { useState } from 'react';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

export default function AddVehicleEntryPage() {
  const history = useNavigate();
  const [vehicleEntryData, setVehicleEntryData] = useState({
    WardNumber: '',
    VehicleRegistrationNumber: '',
    WeightOfWaste: '',
    TimeOfArrival: '',
    TimeOfDeparture: '',
  });

  const [errors, setErrors] = useState({
    WardNumber: '',
    VehicleRegistrationNumber: '',
    WeightOfWaste: '',
    TimeOfArrival: '',
    TimeOfDeparture: '',
  });

  const handleInputChange = (e) => {
    setVehicleEntryData({
      ...vehicleEntryData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    for (const key in vehicleEntryData) {
      if (!vehicleEntryData[key].trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: `${key} can't be empty`,
        }));
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/sts-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleEntryData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Vehicle entry submitted successfully');
        // Reset form after successful submission
        history('/dashboard');
        window.location.reload();
      } else {
        console.error('Error submitting vehicle entry:', responseData.error);
        // Handle error scenario
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Handle unexpected errors, e.g., network issues
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700  ">
          Add Vehicle Entry
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="WardNumber">
              Ward Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.WardNumber ? "border-red-500" : ""}`}
              id="WardNumber"
              type="text"
              name="WardNumber"
              value={vehicleEntryData.WardNumber}
              onChange={handleInputChange}
              placeholder="Ward Number"
            />
            {errors.WardNumber && (
              <p className="text-red-500 text-xs italic">{errors.WardNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="VehicleRegistrationNumber">
              Vehicle Registration Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.VehicleRegistrationNumber ? "border-red-500" : ""}`}
              id="VehicleRegistrationNumber"
              type="text"
              name="VehicleRegistrationNumber"
              value={vehicleEntryData.VehicleRegistrationNumber}
              onChange={handleInputChange}
              placeholder="Vehicle Registration Number"
            />
            {errors.VehicleRegistrationNumber && (
              <p className="text-red-500 text-xs italic">{errors.VehicleRegistrationNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waste_volume">
              Volume of Waste
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.WeightOfWaste ? "border-red-500" : ""}`}
              id="waste_volume"
              type="text"
              name="WeightOfWaste"
              value={vehicleEntryData.WeightOfWaste}
              onChange={handleInputChange}
              placeholder="Volume of Waste"
            />
            {errors.WeightOfWaste && (
              <p className="text-red-500 text-xs italic">{errors.WeightOfWaste}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrival_time">
              Time of Arrival
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TimeOfArrival ? "border-red-500" : ""}`}
              id="arrival_time"
              type="datetime-local"
              name="TimeOfArrival"
              value={vehicleEntryData.TimeOfArrival}
              onChange={handleInputChange}
              placeholder="Time of Arrival"
            />
            {errors.TimeOfArrival && (
              <p className="text-red-500 text-xs italic">{errors.TimeOfArrival}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departure_time">
              Time of Departure
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.TimeOfDeparture ? "border-red-500" : ""}`}
              id="departure_time"
              type="datetime-local"
              name="TimeOfDeparture"
              value={vehicleEntryData.TimeOfDeparture}
              onChange={handleInputChange}
              placeholder="Time of Departure"
            />
            {errors.TimeOfDeparture && (
              <p className="text-red-500 text-xs italic">{errors.TimeOfDeparture}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Vehicle Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
