import React from 'react';
import RateManager from '../components/rates/RateManager';

const RatesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Rate Cards</h1>
      <RateManager />
    </div>
  );
};

export default RatesPage;