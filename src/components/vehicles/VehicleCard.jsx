import React from 'react';
import { Bus, Car, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

const VehicleCard = ({ vehicle, hasIssues, onClick }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'booked': return 'warning';
      case 'maintenance': return 'danger';
      default: return 'default';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'bus': return Bus;
      case 'car': return Car;
      default: return Car;
    }
  };

  const VehicleIcon = getVehicleIcon(vehicle.type);

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <VehicleIcon size={24} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{vehicle.number}</h3>
              <p className="text-sm text-gray-600">{vehicle.model}</p>
            </div>
          </div>
          {hasIssues && (
            <div className="text-red-600">
              <AlertTriangle size={20} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{vehicle.capacity} seats</span>
          </div>
          <Badge variant={getStatusVariant(vehicle.status)}>
            {vehicle.status}
          </Badge>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Driver: {vehicle.driver}</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-500">Trips</p>
              <p className="text-sm font-semibold">{vehicle.stats.totalTrips}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">KMs</p>
              <p className="text-sm font-semibold">{vehicle.stats.totalKms.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="text-sm font-semibold">{formatCurrency(vehicle.stats.revenue)}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;