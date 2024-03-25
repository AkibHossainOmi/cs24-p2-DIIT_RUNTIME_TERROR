import React, { useState } from 'react';
import Navbar from "./Navbar";

export default function CreateStationForm() {
  const [stationData, setStationData] = useState({
    ward_number: '',
    capacity: '',
    longitude: '',
    latitude: '',
  });

  const [errors, setErrors] = useState({
    ward_number: '',
    capacity: '',
    longitude: '',
    latitude: '',
  });

  const handleInputChange = (e) => {
    setStationData({
      ...stationData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { ward_number, capacity, longitude, latitude } = stationData;

    if (!ward_number.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ward_number: "Ward Number can't be empty",
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
    console.log('Station data:', stationData);

    // Reset form after successful submission
    setStationData({
      ward_number: '',
      capacity: '',
      longitude: '',
      latitude: '',
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Create Station
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ward_number">
              Ward Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ward_number ? "border-red-500" : ""}`}
              id="ward_number"
              type="text"
              name="ward_number"
              value={stationData.ward_number}
              onChange={handleInputChange}
              placeholder="Ward Number"
            />
            {errors.ward_number && (
              <p className="text-red-500 text-xs italic">{errors.ward_number}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Capacity
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.capacity ? "border-red-500" : ""}`}
              id="capacity"
              type="text"
              name="capacity"
              value={stationData.capacity}
              onChange={handleInputChange}
              placeholder="Capacity"
            />
            {errors.capacity && (
              <p className="text-red-500 text-xs italic">{errors.capacity}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
              Longitude
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.longitude ? "border-red-500" : ""}`}
              id="longitude"
              type="text"
              name="longitude"
              value={stationData.longitude}
              onChange={handleInputChange}
              placeholder="Longitude"
            />
            {errors.longitude && (
              <p className="text-red-500 text-xs italic">{errors.longitude}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
              Latitude
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.latitude ? "border-red-500" : ""}`}
              id="latitude"
              type="text"
              name="latitude"
              value={stationData.latitude}
              onChange={handleInputChange}
              placeholder="Latitude"
            />
            {errors.latitude && (
              <p className="text-red-500 text-xs italic">{errors.latitude}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
