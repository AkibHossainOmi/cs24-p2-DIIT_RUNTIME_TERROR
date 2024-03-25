import React, { useState } from 'react';
import Navbar from "./Navbar";

export default function AddVehicleEntryPage() {
  const [vehicleEntryData, setVehicleEntryData] = useState({
    sts_id: '',
    vehicle_number: '',
    waste_volume: '',
    arrival_time: '',
    departure_time: '',
  });

  const [errors, setErrors] = useState({
    sts_id: '',
    vehicle_number: '',
    waste_volume: '',
    arrival_time: '',
    departure_time: '',
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

    const { sts_id, vehicle_number, waste_volume, arrival_time, departure_time } = vehicleEntryData;

    if (!sts_id.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        sts_id: "STS ID can't be empty",
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
    console.log('Vehicle entry data:', vehicleEntryData);

    // Reset form after successful submission
    setVehicleEntryData({
      sts_id: '',
      vehicle_number: '',
      waste_volume: '',
      arrival_time: '',
      departure_time: '',
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Add Vehicle Entry
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sts_id">
              STS ID
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.sts_id ? "border-red-500" : ""}`}
              id="sts_id"
              type="text"
              name="sts_id"
              value={vehicleEntryData.sts_id}
              onChange={handleInputChange}
              placeholder="STS ID"
            />
            {errors.sts_id && (
              <p className="text-red-500 text-xs italic">{errors.sts_id}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_number">
              Vehicle Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.vehicle_number ? "border-red-500" : ""}`}
              id="vehicle_number"
              type="text"
              name="vehicle_number"
              value={vehicleEntryData.vehicle_number}
              onChange={handleInputChange}
              placeholder="Vehicle Number"
            />
            {errors.vehicle_number && (
              <p className="text-red-500 text-xs italic">{errors.vehicle_number}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waste_volume">
              Volume of Waste
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.waste_volume ? "border-red-500" : ""}`}
              id="waste_volume"
              type="text"
              name="waste_volume"
              value={vehicleEntryData.waste_volume}
              onChange={handleInputChange}
              placeholder="Volume of Waste"
            />
            {errors.waste_volume && (
              <p className="text-red-500 text-xs italic">{errors.waste_volume}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrival_time">
              Time of Arrival
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.arrival_time ? "border-red-500" : ""}`}
              id="arrival_time"
              type="datetime-local" // Change input type to datetime-local
              name="arrival_time"
              value={vehicleEntryData.arrival_time}
              onChange={handleInputChange}
              placeholder="Time of Arrival"
            />
            {errors.arrival_time && (
              <p className="text-red-500 text-xs italic">{errors.arrival_time}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departure_time">
              Time of Departure
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.departure_time ? "border-red-500" : ""}`}
              id="departure_time"
              type="datetime-local" // Change input type to datetime-local
              name="departure_time"
              value={vehicleEntryData.departure_time}
              onChange={handleInputChange}
              placeholder="Time of Departure"
            />
            {errors.departure_time && (
              <p className="text-red-500 text-xs italic">{errors.departure_time}</p>
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
