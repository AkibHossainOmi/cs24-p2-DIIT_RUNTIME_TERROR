import React, { useState } from 'react';

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 mt-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-center text-purple-700   mb-4">Bill Generation</h2>
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
              <div className="mt-10 text-center w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                <button onClick={calculateBill} className=''>Generate Bill</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillGeneration;