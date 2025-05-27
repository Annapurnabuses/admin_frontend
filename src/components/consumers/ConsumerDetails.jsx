import React, { useState } from 'react';
import { 
  ArrowLeft, Edit, Trash, Phone, Mail, MapPin, Building,
  Calendar, CreditCard, FileText, TrendingUp, Clock
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const ConsumerDetails = ({ consumer, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'payments', label: 'Payments' },
    { id: 'documents', label: 'Documents' },
  ];

  const recentBookings = [
    {
      id: 1,
      bookingNumber: 'BK-2024-001',
      date: '2024-01-15',
      route: 'Delhi → Agra',
      amount: 45000,
      status: 'completed'
    },
    {
      id: 2,
      bookingNumber: 'BK-2024-008',
      date: '2024-01-10',
      route: 'Delhi → Jaipur',
      amount: 55000,
      status: 'ongoing'
    }
  ];

  const recentPayments = [
    {
      id: 1,
      date: '2024-01-14',
      amount: 25000,
      mode: 'Bank Transfer',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2024-01-10',
      amount: 15000,
      mode: 'UPI',
      invoice: 'INV-2024-008'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={onBack}
          >
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{consumer.name}</h2>
            {consumer.company && (
              <p className="text-gray-600 flex items-center gap-1">
                <Building size={16} />
                {consumer.company}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Edit} onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" icon={Trash}>
            Delete
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{consumer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{consumer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{consumer.address}</p>
                  </div>
                </div>
              </div>
              {consumer.gst && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">GST Number</p>
                  <p className="font-medium">{consumer.gst}</p>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.bookingNumber}</p>
                      <p className="text-sm text-gray-600">{booking.route} • {formatDate(booking.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(booking.amount)}</p>
                      <Badge variant={booking.status === 'completed' ? 'success' : 'warning'} size="xs">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Customer Type</p>
                  <Badge variant="primary" size="md">
                    {consumer.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{consumer.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(consumer.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credit Limit</p>
                  <p className="text-lg font-semibold">{formatCurrency(consumer.creditLimit)}</p>
                </div>
                {consumer.outstandingAmount > 0 && (
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">Outstanding Amount</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(consumer.outstandingAmount)}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="primary" size="sm" className="w-full">
                  New Booking
                </Button>
                <Button variant="outline" size="sm" icon={FileText} className="w-full">
                  View Statement
                </Button>
                <Button variant="outline" size="sm" icon={CreditCard} className="w-full">
                  Record Payment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Booking History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookingNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(booking.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(booking.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={booking.status === 'completed' ? 'success' : 'warning'}>
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'payments' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.invoice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.mode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConsumerDetails;