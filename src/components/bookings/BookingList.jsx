import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Phone, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Input from '../common/Input';
import Button from '../common/Button';
import BookingCard from './BookingCard';

const BookingList = ({ onSelectBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const bookings = [
    {
      id: 1,
      bookingNumber: 'BK-2024-001',
      customer: {
        name: 'Raj Kumar',
        phone: '+91 98765 43210',
        email: 'raj@example.com'
      },
      vehicle: {
        number: 'DL 01 AB 1234',
        type: 'Bus - 45 Seater',
        driver: 'Ramesh Kumar'
      },
      trip: {
        from: 'Delhi',
        to: 'Agra',
        startDate: '2024-01-15',
        endDate: '2024-01-17',
        totalDays: 3
      },
      status: 'confirmed',
      payment: {
        total: 45000,
        advance: 15000,
        balance: 30000,
        status: 'partial'
      }
    },
    {
      id: 2,
      bookingNumber: 'BK-2024-002',
      customer: {
        name: 'Priya Sharma',
        phone: '+91 98765 43211',
        email: 'priya@example.com'
      },
      vehicle: {
        number: 'DL 02 CD 5678',
        type: 'Car - Innova',
        driver: 'Suresh Singh'
      },
      trip: {
        from: 'Delhi',
        to: 'Jaipur',
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        totalDays: 3
      },
      status: 'pending',
      payment: {
        total: 25000,
        advance: 0,
        balance: 25000,
        status: 'pending'
      }
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicle.number.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search bookings..."
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
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button variant="outline" icon={Filter}>
            More Filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onClick={() => onSelectBooking(booking)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingList;