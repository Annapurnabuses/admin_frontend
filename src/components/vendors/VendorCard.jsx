import React from 'react';
import { Building, Phone, Mail, Car, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const VendorCard = ({ vendor, onClick }) => {
  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
              <p className="text-sm text-gray-600">{vendor.contactPerson}</p>
            </div>
          </div>
          <Badge variant={vendor.status === 'active' ? 'success' : 'default'}>
            {vendor.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={16} />
            <span>{vendor.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={16} />
            <span>{vendor.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Car size={16} />
            <span>{vendor.vehicleCount} vehicles</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Total Business</p>
              <p className="text-sm font-semibold">{formatCurrency(vendor.totalBusiness)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Transaction</p>
              <p className="text-sm font-semibold">{formatDate(vendor.lastTransaction)}</p>
            </div>
          </div>
          {vendor.outstandingAmount > 0 && (
            <div className="mt-3 p-2 bg-red-50 rounded-lg">
              <p className="text-xs text-red-600">Outstanding: {formatCurrency(vendor.outstandingAmount)}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VendorCard;