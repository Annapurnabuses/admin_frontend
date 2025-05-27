import React, { useState } from 'react';
import ConsumerList from '../components/consumers/ConsumerList';
import ConsumerDetails from '../components/consumers/ConsumerDetails';
import ConsumerForm from '../components/consumers/ConsumerForm';

const ConsumersPage = () => {
  const [view, setView] = useState('list');
  const [selectedConsumer, setSelectedConsumer] = useState(null);

  const handleSelectConsumer = (consumer) => {
    setSelectedConsumer(consumer);
    setView('details');
  };

  const handleAddConsumer = () => {
    setSelectedConsumer(null);
    setView('form');
  };

  const handleEdit = () => {
    setView('form');
  };

  const handleSave = (formData) => {
    console.log('Save consumer:', formData);
    setView('list');
    setSelectedConsumer(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedConsumer(null);
  };

  return (
    <div>
      {view === 'list' && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Consumers</h1>
          <ConsumerList
            onSelectConsumer={handleSelectConsumer}
            onAddConsumer={handleAddConsumer}
          />
        </div>
      )}

      {view === 'details' && selectedConsumer && (
        <ConsumerDetails
          consumer={selectedConsumer}
          onBack={handleBack}
          onEdit={handleEdit}
        />
      )}

      {view === 'form' && (
        <ConsumerForm
          consumer={selectedConsumer}
          onSave={handleSave}
          onCancel={handleBack}
        />
      )}
    </div>
  );
};

export default ConsumersPage;