import React from 'react';
import CurrencySelector from './components/CurrencySelector';
import DateSelector from './components/DateSelector';
import PriceChart from './components/PriceChart';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">Cryptocurrency Price Chart</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <CurrencySelector />
        <DateSelector />
      </div>
      <PriceChart />
    </div>
  );
};

export default App;