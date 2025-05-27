import React, { useState } from 'react';
import { ArrowLeft, User, Building, CreditCard } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const ConsumerForm = ({ consumer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    basic: {
      name: consumer?.name || '',
      phone: consumer?.phone || '',
      alternatePhone: consumer?.alternatePhone || '',
      email: consumer?.email || '',
      address: consumer?.address || '',
      city: consumer?.city || '',
      state: consumer?.state || '',
      pincode: consumer?.pincode || '',
      type: consumer?.type || 'regular'
    },
    business: {
      company: consumer?.company || '',
      gst: consumer?.gst || '',
      pan: consumer?.pan || '',
      creditLimit: consumer?.creditLimit || '',
      paymentTerms: consumer?.paymentTerms || '7'
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
            {consumer ? 'Edit Consumer' : 'Add New Consumer'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={formData.basic.name}
              onChange={(e) => handleChange('basic', 'name', e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Primary Phone"
                value={formData.basic.phone}
                onChange={(e) => handleChange('basic', 'phone', e.target.value)}
                required
              />
              <Input
                label="Alternate Phone"
                value={formData.basic.alternatePhone}
                onChange={(e) => handleChange('basic', 'alternatePhone', e.target.value)}
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={formData.basic.email}
              onChange={(e) => handleChange('basic', 'email', e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Type
              </label>
              <select
                value={formData.basic.type}
                onChange={(e) => handleChange('basic', 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="regular">Regular</option>
                <option value="corporate">Corporate</option>
                <option value="new">New</option>
              </select>
            </div>
            <Input
              label="Address"
              value={formData.basic.address}
              onChange={(e) => handleChange('basic', 'address', e.target.value)}
              required
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                value={formData.basic.city}
                onChange={(e) => handleChange('basic', 'city', e.target.value)}
                required
              />
              <Input
                label="State"
                value={formData.basic.state}
                onChange={(e) => handleChange('basic', 'state', e.target.value)}
                required
              />
              <Input
                label="Pincode"
                value={formData.basic.pincode}
                onChange={(e) => handleChange('basic', 'pincode', e.target.value)}
                required
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {formData.basic.type === 'corporate' && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Building size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold">Business Details</h3>
              </div>
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  value={formData.business.company}
                  onChange={(e) => handleChange('business', 'company', e.target.value)}
                  required
                />
                <Input
                  label="GST Number"
                  value={formData.business.gst}
                  onChange={(e) => handleChange('business', 'gst', e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                />
                <Input
                  label="PAN Number"
                  value={formData.business.pan}
                  onChange={(e) => handleChange('business', 'pan', e.target.value)}
                  placeholder="AAAAA0000A"
                />
              </div>
            </Card>
          )}

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold">Credit Details</h3>
            </div>
            <div className="space-y-4">
              <Input
                label="Credit Limit"
                type="number"
                value={formData.business.creditLimit}
                onChange={(e) => handleChange('business', 'creditLimit', e.target.value)}
                prefix="₹"
              />
              <Input
                label="Payment Terms (days)"
                type="number"
                value={formData.business.paymentTerms}
                onChange={(e) => handleChange('business', 'paymentTerms', e.target.value)}
              />
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {consumer ? 'Update Consumer' : 'Add Consumer'}
        </Button>
      </div>
    </form>
  );
};

export default ConsumerForm;