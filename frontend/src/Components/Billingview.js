import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
});

const BillingView = () => {
  const [distance, setDistance] = useState(null);
  const [perKilometerCost] = useState(0.10); // unloaded+3/5*(loaded-unloaded)
  const [location1, setLocation1] = useState({ lat: 40.712776, lng: -74.005974 }); // Dummy location 1
  const [location2, setLocation2] = useState({ lat: 34.052235, lng: -118.243683 }); // Dummy location 2
  const [landfillID] = useState("ABC123"); // Dummy Landfill ID
  const [stsWardNumber] = useState("Ward 5"); // Dummy STS Ward Number
  const [truckRegNumber] = useState("XYZ456"); // Dummy Truck Registration Number
  const [arrivalTime] = useState("09:00 AM"); // Dummy Arrival Time
  const [departureTime] = useState("12:00 PM"); // Dummy Departure Time
  const [wasteVolumeTons] = useState(5); // Dummy Waste Volume in tons

  useEffect(() => {
    // Calculate distance when component mounts
    calculateDistance();
  }, []); // Empty dependency array ensures this effect runs only once

  const calculateDistance = () => {
    // Dummy implementation to calculate distance (using Haversine formula)
    const dLat = location2.lat - location1.lat;
    const dLng = location2.lng - location1.lng;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat) * Math.cos(location2.lat) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const calculatedDistance = 6371 * c; // Radius of the Earth in kilometers
    setDistance(calculatedDistance);
  };

  const calculateBilling = () => {
    if (distance !== null) {
      return (distance * perKilometerCost).toFixed(2); // Calculate billing based on distance and per kilometer cost
    }
    return null;
  };

  const BillDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Billing Receipt</Text>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Billing Information</Text>
          <Text>Distance: {distance.toFixed(2)} kilometers</Text>
          <Text>Bill: BDT {calculateBilling()}</Text>
        </View>
        <View style={styles.section}>
          
          <Text>Landfill ID: {landfillID}</Text>
          <Text>STS Ward Number: {stsWardNumber}</Text>
          <Text>Truck Registration Number: {truckRegNumber}</Text>
          <Text>Arrival Time: {arrivalTime}</Text>
          <Text>Departure Time: {departureTime}</Text>
          <Text>Waste Volume: {wasteVolumeTons} tons</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700 underline mb-4">Billing View</h2>
            {distance !== null && (
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-4">Distance: {distance.toFixed(2)} kilometers</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">Bill: BDT {calculateBilling() } </p>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  
                  <ul className="list-disc pl-6 mt-2">
                    <li>Landfill ID: {landfillID}</li>
                    <li>STS Ward Number: {stsWardNumber}</li>
                    <li>Truck Registration Number: {truckRegNumber}</li>
                    <li>Arrival Time: {arrivalTime}</li>
                    <li>Departure Time: {departureTime}</li>
                    <li>Waste Volume: {wasteVolumeTons} tons</li>
                  </ul>
                </div>
                <div className="mt-10 text-center w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  <PDFDownloadLink document={<BillDocument />} fileName="bill.pdf">
                    {({ blob, url, loading, error }) =>
                      loading ? 'Generating PDF...' : 'Download Bill as PDF'
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingView;
