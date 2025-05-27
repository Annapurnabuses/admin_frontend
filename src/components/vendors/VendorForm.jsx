import React, { useState } from 'react';
import { ArrowLeft, Building, User, FileText, CreditCard } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const VendorForm = ({ vendor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    basic: {
      name: vendor?.name || '',
      contactPerson: vendor?.contactPerson || '',
      phone: vendor?.phone || '',
      alternatePhone: vendor?.alternatePhone || '',
      email: vendor?.email || '',
      website: vendor?.website || '',
      address: vendor?.address || '',
      city: vendor?.city || '',
      state: vendor?.state || '',
      pincode: vendor?.pincode || ''
    },
    business: {
      gst: vendor?.gst || '',
      pan: vendor?.pan || '',
      bankName: vendor?.bankName || '',
      accountNumber: vendor?.accountNumber || '',
      ifsc: vendor?.ifsc || '',
      accountHolderName: vendor?.accountHolderName || ''
    },
    agreement: {
      commissionType: vendor?.commissionType || 'percentage',
      commissionValue: vendor?.commissionValue || '',
      paymentTerms: vendor?.paymentTerms || '7',
      creditLimit: vendor?.creditLimit || '',
      notes: vendor?.notes || ''
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
            {vendor ? 'Edit Vendor' : 'Add New Vendor'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Building size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Basic Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Company Name"
              value={formData.basic.name}
              onChange={(e) => handleChange('basic', 'name', e.target.value)}
              required
            />
            <Input
              label="Contact Person"
              value={formData.basic.contactPerson}
              onChange={(e) => handleChange('basic', 'contactPerson', e.target.value)}
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
            <Input
              label="Website"
              value={formData.basic.website}
              onChange={(e) => handleChange('basic', 'website', e.target.value)}
              placeholder="https://example.com"
            />
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
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold">Business Details</h3>
            </div>
            <div className="space-y-4">
              <Input
                label="GST Number"
                value={formData.business.gst}
                onChange={(e) => handleChange('business', 'gst', e.target.value)}
                placeholder="22AAAAA0000A1Z5"
                required
              />
              <Input
                label="PAN Number"
                value={formData.business.pan}
                onChange={(e) => handleChange('business', 'pan', e.target.value)}
                placeholder="AAAAA0000A"
              />
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold">Bank Details</h3>
            </div>
            <div className="space-y-4">
              <Input
                label="Bank Name"
                value={formData.business.bankName}
                onChange={(e) => handleChange('business', 'bankName', e.target.value)}
              />
              <Input
                label="Account Number"
                value={formData.business.accountNumber}
                onChange={(e) => handleChange('business', 'accountNumber', e.target.value)}
              />
              <Input
                label="IFSC Code"
                value={formData.business.ifsc}
                onChange={(e) => handleChange('business', 'ifsc', e.target.value)}
              />
              <Input
                label="Account Holder Name"
                value={formData.business.accountHolderName}
                onChange={(e) => handleChange('business', 'accountHolderName', e.target.value)}
              />
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Agreement Terms</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Type
              </label>
              <select
                value={formData.agreement.commissionType}
                onChange={(e) => handleChange('agreement', 'commissionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <Input
              label={formData.agreement.commissionType === 'percentage' ? 'Commission (%)' : 'Commission Amount'}
              type="number"
              value={formData.agreement.commissionValue}
              onChange={(e) => handleChange('agreement', 'commissionValue', e.target.value)}
              prefix={formData.agreement.commissionType === 'fixed' ? '₹' : ''}
              suffix={formData.agreement.commissionType === 'percentage' ? '%' : ''}
            />
            <Input
              label="Payment Terms (days)"
              type="number"
              value={formData.agreement.paymentTerms}
              onChange={(e) => handleChange('agreement', 'paymentTerms', e.target.value)}
            />
            <Input
              label="Credit Limit"
              type="number"
              value={formData.agreement.creditLimit}
              onChange={(e) => handleChange('agreement', 'creditLimit', e.target.value)}
              prefix="₹"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.agreement.notes}
              onChange={(e) => handleChange('agreement', 'notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any special terms or conditions..."
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {vendor ? 'Update Vendor' : 'Add Vendor'}
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;