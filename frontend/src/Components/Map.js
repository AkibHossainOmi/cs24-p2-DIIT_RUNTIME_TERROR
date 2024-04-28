import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const Map = ({ onLatLngChange }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapKey, setMapKey] = useState(0); // Add state to control map re-render

  // Create a custom marker icon
  const defaultMarkerIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    // Reverse geocode the selected place when it's set
    const reverseGeocode = async () => {
      if (selectedPlace) {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPlace.lat}&lon=${selectedPlace.lng}`);
        const data = await response.json();
        if (data.display_name) {
          setSearchQuery(data.display_name);
        }
      }
    };
    reverseGeocode();
  }, [selectedPlace]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
    const data = await response.json();

    console.log("Search Result:", data); // Log the search result

    if (data.length > 0) {
      const { lat, lon } = data[0];
      console.log("Latitude:", lat, "Longitude:", lon); // Log latitude and longitude
      setSelectedPlace({ lat: parseFloat(lat), lng: parseFloat(lon) });
    } else {
      console.log("No results found");
      setSelectedPlace(null);
    }

    // Increment mapKey to trigger map re-render
    setMapKey(prevKey => prevKey + 1);
  };

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedPlace({ lat, lng });
    onLatLngChange(lat, lng); // Call the callback function with lat and lng
  };

  console.log("Selected Place:", selectedPlace);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <div>
      <input className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder="Address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
        className="mt-6 mb-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSearch}>Search</button>
      </div>
      {/* Use mapKey as key to force re-render of MapContainer */}
      <MapContainer key={mapKey} center={[selectedPlace?.lat || 51.505, selectedPlace?.lng || -0.09]} zoom={13} style={{ height: "calc(100% - 40px)", width: "100%" }} onClick={handleClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedPlace && <Marker 
        position={[selectedPlace.lat, selectedPlace.lng]} 
        icon={defaultMarkerIcon} 
        draggable={true} // Enable marker dragging
        eventHandlers={{
            dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setSelectedPlace({ lat, lng });
            }
        }}
        >
        <Popup>Selected Place</Popup>
        </Marker>
        }
      </MapContainer>
    </div>
  );
};

export default Map;
