import React, { useState } from 'react';
import { Plus, Edit, Trash, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import RateCard from './RateCard';
import RateForm from './RateForm';
import Modal from '../common/Modal';

const RateManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);

  const rateCards = [
    {
      id: 1,
      name: 'Standard KM Rate - Bus',
      type: 'km_wise',
      vehicleType: 'bus',
      baseRate: 35,
      minKmPerDay: 250,
      extraKmRate: 40,
      driverAllowance: 500,
      nightCharges: 300,
      outstation: true,
      inclusions: ['Diesel', 'Driver salary'],
      exclusions: ['Toll', 'Parking', 'State tax'],
      active: true
    },
    {
      id: 2,
      name: 'Premium Car Rate',
      type: 'km_wise',
      vehicleType: 'car',
      baseRate: 18,
      minKmPerDay: 200,
      extraKmRate: 22,
      driverAllowance: 300,
      nightCharges: 200,
      outstation: true,
      inclusions: ['Fuel', 'Driver'],
      exclusions: ['Toll', 'Parking'],
      active: true
    },
    {
      id: 3,
      name: 'Lumpsum Package - Agra Tour',
      type: 'lumpsum',
      vehicleType: 'bus',
      totalAmount: 25000,
      duration: '2 days',
      route: 'Delhi - Agra - Delhi',
      inclusions: ['Vehicle', 'Driver', 'Fuel'],
      exclusions: ['Entry tickets', 'Toll', 'Parking'],
      active: true
    },
    {
      id: 4,
      name: 'Daily Wages Contract',
      type: 'daily_wages',
      vehicleType: 'tempo',
      dailyRate: 3500,
      workingHours: 10,
      overtimeRate: 400,
      inclusions: ['Vehicle', 'Driver'],
      exclusions: ['Fuel', 'Toll', 'Parking', 'All expenses'],
      active: false
    }
  ];

  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setShowForm(true);
  };

  const handleDelete = (rateId) => {
    if (window.confirm('Are you sure you want to delete this rate card?')) {
      console.log('Delete rate:', rateId);
    }
  };

  const handleSave = (formData) => {
    console.log('Save rate:', formData);
    setShowForm(false);
    setSelectedRate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Rate Cards</h2>
        <Button
          icon={Plus}
          onClick={() => setShowForm(true)}
        >
          Add Rate Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rateCards.map((rate) => (
          <RateCard
            key={rate.id}
            rate={rate}
            onEdit={() => handleEdit(rate)}
            onDelete={() => handleDelete(rate.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedRate(null);
        }}
        title={selectedRate ? 'Edit Rate Card' : 'Add New Rate Card'}
        size="xl"
      >
        <RateForm
          rate={selectedRate}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedRate(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default RateManager;