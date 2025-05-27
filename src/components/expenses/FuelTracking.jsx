import React from 'react';
import { Fuel, TrendingUp, Car, Calendar } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

const FuelTracking = ({ vehicles }) => {
  const fuelStats = vehicles.map(vehicle => ({
    vehicle: vehicle.number,
    totalFuel: 850, // liters
    totalCost: 68000,
    avgMileage: 12.5, // km/l
    lastFilling: '2024-01-15',
    trend: 'up'
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Fuel Consumption Overview</h3>
        <div className="space-y-4">
          {fuelStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Fuel className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stat.vehicle}</p>
                  <p className="text-sm text-gray-600">
                    {stat.totalFuel}L • {formatCurrency(stat.totalCost)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{stat.avgMileage} km/l</p>
                <p className="text-xs text-gray-500">Avg mileage</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Monthly Fuel Trends</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold">2,450L</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold">₹1,96,000</p>
              <p className="text-sm text-red-600">+15% from last month</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Top Consumers</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">DL 01 AB 1234</span>
                <span className="text-sm font-medium">850L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">DL 02 CD 5678</span>
                <span className="text-sm font-medium">650L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">DL 03 EF 9012</span>
                <span className="text-sm font-medium">450L</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FuelTracking;