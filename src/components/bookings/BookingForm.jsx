import React, { useState } from 'react';
import { ArrowLeft, Calendar, Car, User, MapPin, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const BookingForm = ({ booking, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: {
      name: booking?.customer?.name || '',
      phone: booking?.customer?.phone || '',
      email: booking?.customer?.email || '',
      address: booking?.customer?.address || ''
    },
    trip: {
      from: booking?.trip?.from || '',
      to: booking?.trip?.to || '',
      startDate: booking?.trip?.startDate || '',
      endDate: booking?.trip?.endDate || '',
      purpose: booking?.trip?.purpose || ''
    },
    vehicle: {
      type: booking?.vehicle?.type || '',
      vehicleId: booking?.vehicle?.vehicleId || '',
      driverId: booking?.vehicle?.driverId || ''
    },
    payment: {
      rateType: booking?.payment?.rateType || 'km_wise',
      totalAmount: booking?.payment?.totalAmount || '',
      advanceAmount: booking?.payment?.advanceAmount || '',
      notes: booking?.payment?.notes || ''
    }
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={onCancel}
          >
            Back
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {booking ? 'Edit Booking' : 'New Booking'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Customer Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Customer Name"
              value={formData.customer.name}
              onChange={(e) => handleChange('customer', 'name', e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              value={formData.customer.phone}
              onChange={(e) => handleChange('customer', 'phone', e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.customer.email}
              onChange={(e) => handleChange('customer', 'email', e.target.value)}
            />
            <Input
              label="Address"
              value={formData.customer.address}
              onChange={(e) => handleChange('customer', 'address', e.target.value)}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Trip Details</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="From"
              value={formData.trip.from}
              onChange={(e) => handleChange('trip', 'from', e.target.value)}
              required
            />
            <Input
              label="To"
              value={formData.trip.to}
              onChange={(e) => handleChange('trip', 'to', e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={formData.trip.startDate}
                onChange={(e) => handleChange('trip', 'startDate', e.target.value)}
                required
              />
              <Input
                label="End Date"
                type="date"
                value={formData.trip.endDate}
                onChange={(e) => handleChange('trip', 'endDate', e.target.value)}
                required
              />
            </div>
            <Input
              label="Purpose"
              value={formData.trip.purpose}
              onChange={(e) => handleChange('trip', 'purpose', e.target.value)}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Car size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Vehicle Assignment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                value={formData.vehicle.type}
                onChange={(e) => handleChange('vehicle', 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
                <option value="tempo">Tempo Traveller</option>
                <option value="mini-bus">Mini Bus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle
              </label>
              <select
                value={formData.vehicle.vehicleId}
                onChange={(e) => handleChange('vehicle', 'vehicleId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Vehicle</option>
                <option value="1">DL 01 AB 1234 - Bus 45 Seater</option>
                <option value="2">DL 02 CD 5678 - Innova</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Driver
              </label>
              <select
                value={formData.vehicle.driverId}
                onChange={(e) => handleChange('vehicle', 'driverId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Driver</option>
                <option value="1">Ramesh Kumar</option>
                <option value="2">Suresh Singh</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Payment Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate Type
              </label>
              <select
                value={formData.payment.rateType}
                onChange={(e) => handleChange('payment', 'rateType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="km_wise">KM Wise</option>
                <option value="lumpsum">Lumpsum</option>
                <option value="daily_wages">Daily Wages</option>
              </select>
            </div>
            <Input
              label="Total Amount"
              type="number"
              value={formData.payment.totalAmount}
              onChange={(e) => handleChange('payment', 'totalAmount', e.target.value)}
              prefix="₹"
              required
            />
            <Input
              label="Advance Amount"
              type="number"
              value={formData.payment.advanceAmount}
              onChange={(e) => handleChange('payment', 'advanceAmount', e.target.value)}
              prefix="₹"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.payment.notes}
                onChange={(e) => handleChange('payment', 'notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {booking ? 'Update Booking' : 'Create Booking'}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;