import React from 'react';
import { Plus, FileText, Bus, Users } from 'lucide-react';
import Button from '../common/Button';

const QuickActions = () => {
  const actions = [
    { label: 'New Booking', icon: Plus, color: 'primary' },
    { label: 'Add Vehicle', icon: Bus, color: 'secondary' },
    { label: 'Add Customer', icon: Users, color: 'secondary' },
    { label: 'Generate Invoice', icon: FileText, color: 'secondary' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.color}
            icon={action.icon}
            className="w-full"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;