import React, { useState, useEffect } from 'react';
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

const BillingView = (dumpingEntryData) => {
  const [distance, setDistance] = useState(null);
  const [perKilometerCost, setPerKilometerCost] = useState(null);
  const [landfillID] = useState(dumpingEntryData.params.LandfillID);
  const [stsWardNumber] = useState(dumpingEntryData.params.wardNumber);
  const [truckRegNumber] = useState(dumpingEntryData.params.VehicleRegistrationNumber);
  const [arrivalTime] = useState(dumpingEntryData.params.TimeOfArrival);
  const [departureTime] = useState(dumpingEntryData.params.TimeOfDeparture);
  const [wasteVolumeTons] = useState(dumpingEntryData.params.WeightOfWaste);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post('http://localhost:8000/billing-calculation-details', {
          WardNumber: stsWardNumber,
          LandfillID: landfillID,
          VehicleRegistrationNumber: truckRegNumber
        });

        if (response.status === 200) {
          const { Distance, PerKilometerCost } = response.data;
          setDistance(Distance);
          setPerKilometerCost(PerKilometerCost);
        } else {
          console.error('Error fetching details');
        }
      } catch (error) {
        console.error('An error occurred while fetching details:', error);
      }
    };

    fetchDetails();
  }, [stsWardNumber, landfillID, truckRegNumber]);

  const calculateBilling = () => {
    if (distance !== null && perKilometerCost !== null) {
      return (distance * perKilometerCost);
    }
    return null;
  };

  const BillDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Billing Receipt</Text>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Billing Information</Text>
          {distance !== null && <Text>Distance: {distance} kilometers</Text>}
          {calculateBilling() !== null && <Text>Bill: BDT {parseInt(calculateBilling())}</Text>}
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
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700   mb-4">Billing Statement</h2>
            {distance !== null && perKilometerCost !== null && (
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-4">Distance: {distance} kilometers</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">Bill: BDT {parseInt(calculateBilling())}</p>
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
