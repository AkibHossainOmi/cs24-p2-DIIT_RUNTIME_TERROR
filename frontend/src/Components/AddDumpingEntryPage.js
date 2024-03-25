import React, { useState } from 'react';
import Navbar from "./Navbar";

export default function AddDumpingEntryPage() {
  const [dumpingEntryData, setDumpingEntryData] = useState({
    volume: '',
    arrival_time: '',
    departure_time: '',
  });

  const [errors, setErrors] = useState({
    volume: '',
    arrival_time: '',
    departure_time: '',
  });

  const handleInputChange = (e) => {
    setDumpingEntryData({
      ...dumpingEntryData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    const { volume, arrival_time, departure_time } = dumpingEntryData;

    if (!volume.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        volume: "Volume can't be empty",
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
    console.log('Dumping entry data:', dumpingEntryData);

    // Reset form after successful submission
    setDumpingEntryData({
      volume: '',
      arrival_time: '',
      departure_time: '',
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Add Dumping Entry
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volume">
              Volume of Waste
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.volume ? "border-red-500" : ""}`}
              id="volume"
              type="text"
              name="volume"
              value={dumpingEntryData.volume}
              onChange={handleInputChange}
              placeholder="Volume of Waste"
            />
            {errors.volume && (
              <p className="text-red-500 text-xs italic">{errors.volume}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrival_time">
              Time of Arrival
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.arrival_time ? "border-red-500" : ""}`}
              id="arrival_time"
              type="datetime-local"
              name="arrival_time"
              value={dumpingEntryData.arrival_time}
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
              type="datetime-local"
              name="departure_time"
              value={dumpingEntryData.departure_time}
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
              Add Dumping Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
