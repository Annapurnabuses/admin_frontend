import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import ExpenseCard from './ExpenseCard';
import { formatCurrency } from '../../utils/formatters';

const ExpenseList = ({ onSelectExpense, onAddExpense }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const expenses = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'fuel',
      description: 'Diesel for DL 01 AB 1234',
      amount: 5000,
      vehicle: 'DL 01 AB 1234',
      bookingId: 'BK-2024-001',
      vendor: 'HP Petrol Pump',
      receiptNumber: 'RCP-001',
      liters: 65
    },
    {
      id: 2,
      date: '2024-01-14',
      type: 'maintenance',
      description: 'Oil change and service',
      amount: 3500,
      vehicle: 'DL 02 CD 5678',
      vendor: 'ABC Service Center',
      receiptNumber: 'RCP-002'
    },
    {
      id: 3,
      date: '2024-01-13',
      type: 'driver_allowance',
      description: 'Daily allowance for driver',
      amount: 1000,
      vehicle: 'DL 01 AB 1234',
      bookingId: 'BK-2024-001',
      driver: 'Ramesh Kumar'
    },
    {
      id: 4,
      date: '2024-01-12',
      type: 'toll_parking',
      description: 'Toll charges Delhi-Agra',
      amount: 850,
      vehicle: 'DL 01 AB 1234',
      bookingId: 'BK-2024-001',
      receiptNumber: 'TOLL-123'
    }
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.vendor?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || expense.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const expensesByType = expenses.reduce((acc, expense) => {
    acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <TrendingUp className="text-blue-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Fuel</p>
            <p className="text-xl font-bold">{formatCurrency(expensesByType.fuel || 0)}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Maintenance</p>
            <p className="text-xl font-bold">{formatCurrency(expensesByType.maintenance || 0)}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Others</p>
            <p className="text-xl font-bold">
              {formatCurrency(
                Object.entries(expensesByType)
                  .filter(([type]) => !['fuel', 'maintenance'].includes(type))
                  .reduce((sum, [, amount]) => sum + amount, 0)
              )}
            </p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="fuel">Fuel</option>
            <option value="maintenance">Maintenance</option>
            <option value="driver_allowance">Driver Allowance</option>
            <option value="toll_parking">Toll & Parking</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          <Button variant="outline" icon={Filter}>
            Date Range
          </Button>
          <Button icon={Plus} onClick={onAddExpense}>
            Add Expense
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onClick={() => onSelectExpense(expense)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;