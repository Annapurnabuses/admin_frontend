import React, { useState } from 'react';
import { DollarSign, Plus, X } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const RateForm = ({ rate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: rate?.name || '',
    type: rate?.type || 'km_wise',
    vehicleType: rate?.vehicleType || '',
    active: rate?.active ?? true,
    
    // KM wise fields
    baseRate: rate?.baseRate || '',
    minKmPerDay: rate?.minKmPerDay || '',
    extraKmRate: rate?.extraKmRate || '',
    driverAllowance: rate?.driverAllowance || '',
    nightCharges: rate?.nightCharges || '',
    outstation: rate?.outstation || false,
    
    // Lumpsum fields
    totalAmount: rate?.totalAmount || '',
    duration: rate?.duration || '',
    route: rate?.route || '',
    
    // Daily wages fields
    dailyRate: rate?.dailyRate || '',
    workingHours: rate?.workingHours || '',
    overtimeRate: rate?.overtimeRate || '',
    
    // Common fields
    inclusions: rate?.inclusions || [''],
    exclusions: rate?.exclusions || ['']
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Rate Card Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="km_wise">KM Based</option>
              <option value="lumpsum">Lumpsum</option>
              <option value="daily_wages">Daily Wages</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.vehicleType}
              onChange={(e) => handleChange('vehicleType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Vehicle</option>
              <option value="bus">Bus</option>
              <option value="car">Car</option>
              <option value="tempo">Tempo Traveller</option>
              <option value="mini-bus">Mini Bus</option>
            </select>
          </div>
        </div>
      </div>

      {formData.type === 'km_wise' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">KM Based Rate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Base Rate per KM"
              type="number"
              value={formData.baseRate}
              onChange={(e) => handleChange('baseRate', e.target.value)}
              prefix="₹"
              required
            />
            <Input
              label="Minimum KM per Day"
              type="number"
              value={formData.minKmPerDay}
              onChange={(e) => handleChange('minKmPerDay', e.target.value)}
              suffix="km"
              required
            />
            <Input
              label="Extra KM Rate"
              type="number"
              value={formData.extraKmRate}
              onChange={(e) => handleChange('extraKmRate', e.target.value)}
              prefix="₹"
              required
            />
            <Input
              label="Driver Allowance per Day"
              type="number"
              value={formData.driverAllowance}
              onChange={(e) => handleChange('driverAllowance', e.target.value)}
              prefix="₹"
            />
            <Input
              label="Night Charges"
              type="number"
              value={formData.nightCharges}
              onChange={(e) => handleChange('nightCharges', e.target.value)}
              prefix="₹"
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="outstation"
                checked={formData.outstation}
                onChange={(e) => handleChange('outstation', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="outstation" className="text-sm font-medium text-gray-700">
                Applicable for Outstation
              </label>
            </div>
          </div>
        </Card>
      )}

      {formData.type === 'lumpsum' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Lumpsum Package Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Total Package Amount"
              type="number"
              value={formData.totalAmount}
              onChange={(e) => handleChange('totalAmount', e.target.value)}
              prefix="₹"
              required
            />
            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g., 2 days 1 night"
              required
            />
            <Input
              label="Route"
              value={formData.route}
              onChange={(e) => handleChange('route', e.target.value)}
              placeholder="e.g., Delhi - Agra - Delhi"
              className="md:col-span-2"
              required
            />
          </div>
        </Card>
      )}

      {formData.type === 'daily_wages' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Daily Wages Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Daily Rate"
              type="number"
              value={formData.dailyRate}
              onChange={(e) => handleChange('dailyRate', e.target.value)}
              prefix="₹"
              required
            />
            <Input
              label="Working Hours"
              type="number"
              value={formData.workingHours}
              onChange={(e) => handleChange('workingHours', e.target.value)}
              suffix="hours"
              required
            />
            <Input
              label="Overtime Rate per Hour"
              type="number"
              value={formData.overtimeRate}
              onChange={(e) => handleChange('overtimeRate', e.target.value)}
              prefix="₹"
              required
            />
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Inclusions</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => addArrayItem('inclusions')}
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {formData.inclusions.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Fuel charges"
                  required
                />
                {formData.inclusions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('inclusions', index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Exclusions</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => addArrayItem('exclusions')}
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {formData.exclusions.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Toll charges"
                  required
                />
                {formData.exclusions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('exclusions', index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => handleChange('active', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">
            Active Rate Card
          </label>
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {rate ? 'Update Rate Card' : 'Create Rate Card'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RateForm;