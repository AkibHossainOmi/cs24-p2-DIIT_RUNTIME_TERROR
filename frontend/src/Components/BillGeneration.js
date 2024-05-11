import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const BillGeneration = ({ weightOfWasteCollected, requiredWaste, paymentPerTonnage, fineRate }) => {
  const [basicPay, setBasicPay] = useState(0);
  const [deficit, setDeficit] = useState(0);
  const [fine, setFine] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const calculateBill = () => {
    // Calculate basic pay
    const basicPayValue = weightOfWasteCollected * paymentPerTonnage;
    setBasicPay(basicPayValue);

    // Calculate deficit
    const deficitValue = Math.max(0, requiredWaste - weightOfWasteCollected);
    setDeficit(deficitValue);

    // Calculate fine
    const fineValue = deficitValue * fineRate;
    setFine(fineValue);

    // Calculate total bill
    const totalBillValue = basicPayValue - fineValue;
    setTotalBill(totalBillValue);
  };

  // PDF document component
  const PDFDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Bill Generation</Text>
          <Text style={styles.text}>Weight of Waste Collected: {weightOfWasteCollected} tons</Text>
          <Text style={styles.text}>Required Waste: {requiredWaste} tons</Text>
          <Text style={styles.text}>Payment per Tonnage: BDT {paymentPerTonnage}</Text>
          <Text style={styles.text}>Fine Rate: BDT {fineRate} per ton</Text>
          <Text style={styles.text}>Basic Pay: BDT {basicPay}</Text>
          <Text style={styles.text}>Deficit: {deficit} tons</Text>
          <Text style={styles.text}>Fine: BDT {fine}</Text>
          <Text style={styles.text}>Total Bill: BDT {totalBill}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700 mb-4">Bill Generation</h2>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-4">Weight of Waste Collected: {weightOfWasteCollected} tons</p>
              <p className="text-lg font-semibold text-gray-800 mb-4">Required Waste: {requiredWaste} tons</p>
              <p className="text-lg font-semibold text-gray-800 mb-4">Payment per Tonnage: BDT {paymentPerTonnage}</p>
              <p className="text-lg font-semibold text-gray-800 mb-4">Fine Rate: BDT {fineRate} per ton</p>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <p className="text-lg font-semibold text-gray-800 mb-4">Basic Pay: BDT {basicPay}</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">Deficit: {deficit} tons</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">Fine: BDT {fine}</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">Total Bill: BDT {totalBill}</p>
              </div>


              <div className="flex justify-between">
                <button onClick={calculateBill} className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Generate Bill
                </button>
                <PDFDownloadLink document={PDFDocument} fileName="bill.pdf">
                  {({ blob, url, loading, error }) => (
                    <button className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                      {loading ? 'Loading document...' : 'Download Bill as PDF'}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillGeneration;
