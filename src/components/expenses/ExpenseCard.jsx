import React from 'react';
import { Calendar, Car, FileText, Fuel, Wrench, DollarSign, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const ExpenseCard = ({ expense, onClick }) => {
  const getExpenseIcon = (type) => {
    switch (type) {
      case 'fuel': return Fuel;
      case 'maintenance': return Wrench;
      default: return DollarSign;
    }
  };

  const getExpenseLabel = (type) => {
    const labels = {
      fuel: 'Fuel',
      maintenance: 'Maintenance',
      driver_allowance: 'Driver Allowance',
      toll_parking: 'Toll & Parking',
      miscellaneous: 'Miscellaneous'
    };
    return labels[type] || type;
  };

  const Icon = getExpenseIcon(expense.type);

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${
            expense.type === 'fuel' ? 'bg-green-100' :
            expense.type === 'maintenance' ? 'bg-orange-100' :
            'bg-gray-100'
          }`}>
            <Icon size={24} className={
              expense.type === 'fuel' ? 'text-green-600' :
              expense.type === 'maintenance' ? 'text-orange-600' :
              'text-gray-600'
            } />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{expense.description}</h3>
                <Badge variant="default" size="xs">
                  {getExpenseLabel(expense.type)}
                </Badge>
              </div>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(expense.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Car size={14} />
                <span>{expense.vehicle}</span>
              </div>
              {expense.bookingId && (
                <div className="flex items-center gap-1">
                  <FileText size={14} />
                  <span>{expense.bookingId}</span>
                </div>
              )}
              {expense.liters && (
                <div className="flex items-center gap-1">
                  <Fuel size={14} />
                  <span>{expense.liters} L</span>
                </div>
              )}
            </div>
            
            {expense.vendor && (
              <p className="text-sm text-gray-500 mt-2">Vendor: {expense.vendor}</p>
            )}
          </div>
        </div>
        
        <ChevronRight size={20} className="text-gray-400 ml-4" />
      </div>
    </Card>
  );
};

export default ExpenseCard;