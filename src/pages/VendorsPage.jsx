import React, { useState } from 'react';
import VendorList from '../components/vendors/VendorList';
import VendorForm from '../components/vendors/VendorForm';

const VendorsPage = () => {
  const [view, setView] = useState('list');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleSelectVendor = (vendor) => {
    setSelectedVendor(vendor);
    setView('form');
  };

  const handleAddVendor = () => {
    setSelectedVendor(null);
    setView('form');
  };

  const handleSave = (formData) => {
    console.log('Save vendor:', formData);
    setView('list');
    setSelectedVendor(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedVendor(null);
  };

  return (
    <div>
      {view === 'list' && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <VendorList
            onSelectVendor={handleSelectVendor}
            onAddVendor={handleAddVendor}
          />
        </div>
      )}

      {view === 'form' && (
        <VendorForm
          vendor={selectedVendor}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default VendorsPage;