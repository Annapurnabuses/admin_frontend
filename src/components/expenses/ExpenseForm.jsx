import React, { useState } from 'react';
import { ArrowLeft, Receipt, Car, Calendar, Upload } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const ExpenseForm = ({ expense, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: expense?.date || new Date().toISOString().split('T')[0],
    type: expense?.type || '',
    description: expense?.description || '',
    amount: expense?.amount || '',
    vehicle: expense?.vehicle || '',
    bookingId: expense?.bookingId || '',
    vendor: expense?.vendor || '',
    receiptNumber: expense?.receiptNumber || '',
    liters: expense?.liters || '',
    pricePerLiter: expense?.pricePerLiter || '',
    odometerReading: expense?.odometerReading || '',
    notes: expense?.notes || '',
    receipt: null
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate fuel amount
    if (formData.type === 'fuel' && (field === 'liters' || field === 'pricePerLiter')) {
      const liters = field === 'liters' ? value : formData.liters;
      const price = field === 'pricePerLiter' ? value : formData.pricePerLiter;
      if (liters && price) {
        setFormData(prev => ({
          ...prev,
          amount: liters * price
        }));
      }
    }
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
            {expense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Receipt size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Expense Details</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expense Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="fuel">Fuel</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="driver_allowance">Driver Allowance</option>
                  <option value="toll_parking">Toll & Parking</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>
            </div>
            
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of expense"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => handleChange('vehicle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Vehicle</option>
                  <option value="DL 01 AB 1234">DL 01 AB 1234</option>
                  <option value="DL 02 CD 5678">DL 02 CD 5678</option>
                  <option value="DL 03 EF 9012">DL 03 EF 9012</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking ID
                </label>
                <select
                  value={formData.bookingId}
                  onChange={(e) => handleChange('bookingId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Booking</option>
                  <option value="BK-2024-001">BK-2024-001</option>
                  <option value="BK-2024-002">BK-2024-002</option>
                </select>
              </div>
            </div>
            
            <Input
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              prefix="₹"
              required
              disabled={formData.type === 'fuel' && formData.liters && formData.pricePerLiter}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Car size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Additional Information</h3>
          </div>
          <div className="space-y-4">
            {formData.type === 'fuel' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Liters"
                    type="number"
                    value={formData.liters}
                    onChange={(e) => handleChange('liters', e.target.value)}
                    step="0.01"
                  />
                  <Input
                    label="Price per Liter"
                    type="number"
                    value={formData.pricePerLiter}
                    onChange={(e) => handleChange('pricePerLiter', e.target.value)}
                    prefix="₹"
                    step="0.01"
                  />
                </div>
                <Input
                  label="Odometer Reading"
                  type="number"
                  value={formData.odometerReading}
                  onChange={(e) => handleChange('odometerReading', e.target.value)}
                  suffix="km"
                />
              </>
            )}
            
            <Input
              label="Vendor/Station Name"
              value={formData.vendor}
              onChange={(e) => handleChange('vendor', e.target.value)}
              placeholder="e.g. HP Petrol Pump"
            />
            
            <Input
              label="Receipt/Bill Number"
              value={formData.receiptNumber}
              onChange={(e) => handleChange('receiptNumber', e.target.value)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Receipt
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleChange('receipt', e.target.files[0])}
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload">
                  <Button type="button" variant="outline" size="sm">
                    Choose File
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {expense ? 'Update Expense' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;