import React from 'react';
import { Calendar, MapPin, Phone, ChevronRight, Car, CreditCard } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const BookingCard = ({ booking, onClick }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  const getPaymentVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'partial': return 'warning';
      case 'pending': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{booking.bookingNumber}</h3>
              <p className="text-sm text-gray-600">{booking.customer.name}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={getStatusVariant(booking.status)}>
                {booking.status}
              </Badge>
              <Badge variant={getPaymentVariant(booking.payment.status)} size="xs">
                Payment: {booking.payment.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Car size={16} />
              <span>{booking.vehicle.type} • {booking.vehicle.number}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={16} />
              <span>{booking.customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span>{booking.trip.from} → {booking.trip.to}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <span>{formatDate(booking.trip.startDate)} - {formatDate(booking.trip.endDate)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="font-semibold">{formatCurrency(booking.payment.total)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Balance</p>
                <p className="font-semibold text-red-600">{formatCurrency(booking.payment.balance)}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;