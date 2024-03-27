import React, { useState } from 'react';
import Navbar from "./Navbar";

export default function CreateLandfillForm() {
  const [landfillData, setLandfillData] = useState({
    name: '',
    capacity: '',
    operational_timespan: '',
    longitude: '',
    latitude: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    capacity: '',
    operational_timespan: '',
    longitude: '',
    latitude: '',
  });

  const handleInputChange = (e) => {
    setLandfillData({
      ...landfillData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { name, capacity, operational_timespan, longitude, latitude } = landfillData;

    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name can't be empty",
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
    console.log('Landfill data:', landfillData);

    // Reset form after successful submission
    setLandfillData({
      name: '',
      capacity: '',
      operational_timespan: '',
      longitude: '',
      latitude: '',
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h2 className="text-3xl font-semibold text-center text-purple-700 underline mb-2">
          Create Landfill
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""}`}
              id="name"
              type="text"
              name="name"
              value={landfillData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
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
              value={landfillData.capacity}
              onChange={handleInputChange}
              placeholder="Capacity"
            />
            {errors.capacity && (
              <p className="text-red-500 text-xs italic">{errors.capacity}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operational_timespan">
              Operational Timespan
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.operational_timespan ? "border-red-500" : ""}`}
              id="operational_timespan"
              type="text"
              name="operational_timespan"
              value={landfillData.operational_timespan}
              onChange={handleInputChange}
              placeholder="Operational Timespan"
            />
            {errors.operational_timespan && (
              <p className="text-red-500 text-xs italic">{errors.operational_timespan}</p>
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
              value={landfillData.longitude}
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
              value={landfillData.latitude}
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
              Create Landfill
            </button>
          </div>
        </form>
        </form>
      </div>
    </div>
  );
}