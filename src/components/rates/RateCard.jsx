import React from 'react';
import { Edit, Trash, Car, Bus, DollarSign, Check, X } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

const RateCard = ({ rate, onEdit, onDelete }) => {
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'bus': return Bus;
      case 'car': return Car;
      default: return Car;
    }
  };

  const VehicleIcon = getVehicleIcon(rate.vehicleType);

  const getRateTypeLabel = (type) => {
    switch (type) {
      case 'km_wise': return 'KM Based';
      case 'lumpsum': return 'Lumpsum';
      case 'daily_wages': return 'Daily Wages';
      default: return type;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <VehicleIcon className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{rate.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="info" size="xs">
                {getRateTypeLabel(rate.type)}
              </Badge>
              <Badge variant={rate.active ? 'success' : 'default'} size="xs">
                {rate.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={onEdit}
          />
          <Button
            variant="outline"
            size="sm"
            icon={Trash}
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50"
          />
        </div>
      </div>

      <div className="space-y-3">
        {rate.type === 'km_wise' && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Base Rate</p>
                <p className="font-semibold">{formatCurrency(rate.baseRate)}/km</p>
              </div>
              <div>
                <p className="text-gray-600">Min KM/Day</p>
                <p className="font-semibold">{rate.minKmPerDay} km</p>
              </div>
              <div>
                <p className="text-gray-600">Extra KM Rate</p>
                <p className="font-semibold">{formatCurrency(rate.extraKmRate)}/km</p>
              </div>
              <div>
                <p className="text-gray-600">Driver Allowance</p>
                <p className="font-semibold">{formatCurrency(rate.driverAllowance)}/day</p>
              </div>
            </div>
            {rate.nightCharges && (
              <div className="text-sm">
                <p className="text-gray-600">Night Charges</p>
                <p className="font-semibold">{formatCurrency(rate.nightCharges)}</p>
              </div>
            )}
          </>
        )}

        {rate.type === 'lumpsum' && (
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-600">Package Amount</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(rate.totalAmount)}</p>
            </div>
            <div>
              <p className="text-gray-600">Duration</p>
              <p className="font-semibold">{rate.duration}</p>
            </div>
            <div>
              <p className="text-gray-600">Route</p>
              <p className="font-semibold">{rate.route}</p>
            </div>
          </div>
        )}

        {rate.type === 'daily_wages' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Daily Rate</p>
              <p className="font-semibold">{formatCurrency(rate.dailyRate)}/day</p>
            </div>
            <div>
              <p className="text-gray-600">Working Hours</p>
              <p className="font-semibold">{rate.workingHours} hours</p>
            </div>
            <div>
              <p className="text-gray-600">Overtime Rate</p>
              <p className="font-semibold">{formatCurrency(rate.overtimeRate)}/hour</p>
            </div>
          </div>
        )}

        <div className="pt-3 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Inclusions</p>
              <div className="space-y-1">
                {rate.inclusions.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-green-600">
                    <Check size={12} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Exclusions</p>
              <div className="space-y-1">
                {rate.exclusions.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-red-600">
                    <X size={12} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RateCard;