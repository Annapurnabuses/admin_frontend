import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, DollarSign, CreditCard } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import PaymentCard from './PaymentCard';

const PaymentList = ({ onSelectPayment, onAddPayment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const payments = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      bookingNumber: 'BK-2024-001',
      customerName: 'Raj Kumar',
      date: '2024-01-15',
      dueDate: '2024-01-25',
      totalAmount: 45000,
      paidAmount: 15000,
      balance: 30000,
      status: 'partial',
      paymentMode: 'Bank Transfer'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      bookingNumber: 'BK-2024-002',
      customerName: 'Priya Sharma',
      date: '2024-01-14',
      dueDate: '2024-01-24',
      totalAmount: 25000,
      paidAmount: 0,
      balance: 25000,
      status: 'pending',
      paymentMode: '-'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      bookingNumber: 'BK-2024-003',
      customerName: 'Amit Patel',
      date: '2024-01-10',
      dueDate: '2024-01-20',
      totalAmount: 35000,
      paidAmount: 35000,
      balance: 0,
      status: 'completed',
      paymentMode: 'UPI'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = filteredPayments.reduce((sum, payment) => sum + payment.balance, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-red-600">₹{totalOutstanding.toLocaleString()}</p>
            </div>
            <DollarSign className="text-red-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month Collection</p>
              <p className="text-2xl font-bold text-green-600">₹2,50,000</p>
            </div>
            <CreditCard className="text-green-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue Payments</p>
              <p className="text-2xl font-bold text-orange-600">5</p>
            </div>
            <Calendar className="text-orange-600" size={32} />
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <Button variant="outline" icon={Filter}>
            More Filters
          </Button>
          <Button icon={Plus} onClick={onAddPayment}>
            Record Payment
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onClick={() => onSelectPayment(payment)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentList;