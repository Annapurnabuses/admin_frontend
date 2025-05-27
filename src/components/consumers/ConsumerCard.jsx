import React from 'react';
import { Phone, Mail, MapPin, Building, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

const ConsumerCard = ({ consumer, onClick }) => {
  const getTypeVariant = (type) => {
    switch (type) {
      case 'regular': return 'info';
      case 'corporate': return 'primary';
      case 'new': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{consumer.name}</h3>
            {consumer.company && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Building size={14} />
                <span>{consumer.company}</span>
              </div>
            )}
          </div>
          <Badge variant={getTypeVariant(consumer.type)}>
            {consumer.type}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={16} />
            <span>{consumer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={16} />
            <span>{consumer.email}</span>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <MapPin size={16} className="mt-0.5" />
            <span className="line-clamp-2">{consumer.address}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Total Bookings</p>
              <p className="text-sm font-semibold">{consumer.totalBookings}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-sm font-semibold">{formatCurrency(consumer.totalAmount)}</p>
            </div>
          </div>
          {consumer.outstandingAmount > 0 && (
            <div className="mt-3 p-2 bg-red-50 rounded-lg">
              <p className="text-xs text-red-600">Outstanding: {formatCurrency(consumer.outstandingAmount)}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ConsumerCard;