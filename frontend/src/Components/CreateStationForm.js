import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateStationForm() {
  const history = useNavigate();
  const [stationData, setStationData] = useState({
    WardNumber: '',
    CapacityInTonnes: '',
    address: '',
    Longitude: '',
    Latitude: '',
  });

  const [errors, setErrors] = useState({
    WardNumber: '',
    CapacityInTonnes: '',
    address: '',
    Longitude: '',
    Latitude: '',
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

    const { WardNumber, CapacityInTonnes, address, Longitude, Latitude } = stationData;

    if (!WardNumber.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        WardNumber: "Ward Number can't be empty",
      }));
      isValid = false;
    }
    // Add validation for other fields (e.g., CapacityInTonnes, address, Longitude, Latitude)

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/sts', stationData);
      console.log('Response from API:', response.data);
      
      // Reset form after successful submission
      history('/admin/all_sts');
      window.location.reload();
      setStationData({
        WardNumber: '',
        CapacityInTonnes: '',
        address: '',
        Longitude: '',
        Latitude: '',
      });
    } catch (error) {
      console.error('Error inserting STS data:', error);
    }
  };

  const handleGeocode = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(stationData.address)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setStationData({
          ...stationData,
          Latitude: lat,
          Longitude: lon,
        });
      } else {
        // Handle error, no results found
        console.error('No results found');
      }
    } catch (error) {
      // Handle error, e.g., network error, API error
      console.error('Error fetching geocode data:', error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-8">
        <h1 className="mt-10 text-3xl font-semibold text-center text-purple-700  ">
          Create STS
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="WardNumber">
              Ward Number
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.WardNumber ? "border-red-500" : ""}`}
              id="WardNumber"
              type="text"
              name="WardNumber"
              value={stationData.WardNumber}
              onChange={handleInputChange}
              placeholder="Ward Number"
            />
            {errors.WardNumber && (
              <p className="text-red-500 text-xs italic">{errors.WardNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CapacityInTonnes">
              Capacity
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.CapacityInTonnes ? "border-red-500" : ""}`}
              id="CapacityInTonnes"
              type="text"
              name="CapacityInTonnes"
              value={stationData.CapacityInTonnes}
              onChange={handleInputChange}
              placeholder="Capacity"
            />
            {errors.CapacityInTonnes && (
              <p className="text-red-500 text-xs italic">{errors.CapacityInTonnes}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="address"
              type="text"
              name="address"
              value={stationData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Longitude">
              Longitude
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Longitude ? "border-red-500" : ""}`}
              id="Longitude"
              type="text"
              name="Longitude"
              value={stationData.Longitude}
              onChange={handleInputChange}
              placeholder="Longitude"
            />
            {errors.Longitude && (
              <p className="text-red-500 text-xs italic">{errors.Longitude}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Latitude">
              Latitude
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Latitude ? "border-red-500" : ""}`}
              id="Latitude"
              type="text"
              name="Latitude"
              value={stationData.Latitude}
              onChange={handleInputChange}
              placeholder="Latitude"
            />
            {errors.Latitude && (
              <p className="text-red-500 text-xs italic">{errors.Latitude}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Station
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleGeocode}
            >
              Get Geolocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
