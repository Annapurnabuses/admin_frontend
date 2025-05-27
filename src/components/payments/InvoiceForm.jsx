import React, { useState } from 'react';
import { ArrowLeft, FileText, User, Calendar, CreditCard } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import { formatCurrency } from '../../utils/formatters';

const InvoiceForm = ({ booking, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    bookingId: booking?.id || '',
    items: [
      {
        description: 'Vehicle Rental Charges',
        quantity: booking?.trip?.totalDays || 1,
        rate: booking?.payment?.ratePerDay || 0,
        amount: 0
      }
    ],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    notes: '',
    terms: 'Payment due within 7 days',
    dueDate: ''
  });

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const taxAmount = (subtotal * formData.tax) / 100;
    const total = subtotal + taxAmount - formData.discount;
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      total
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
    
    calculateTotals();
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
    calculateTotals();
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
          <h2 className="text-2xl font-bold text-gray-900">Generate Invoice</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Invoice Items</h3>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Description</th>
                      <th className="text-left py-2 w-24">Qty</th>
                      <th className="text-left py-2 w-32">Rate</th>
                      <th className="text-left py-2 w-32">Amount</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            required
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            min="1"
                            required
                          />
                        </td>
                        <td className="py-2">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            min="0"
                            required
                          />
                        </td>
                        <td className="py-2">
                          <span className="font-medium">{formatCurrency(item.amount)}</span>
                        </td>
                        <td className="py-2">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional notes..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terms & Conditions
                </label>
                <textarea
                  value={formData.terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Invoice Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(formData.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.tax}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, tax: Number(e.target.value) }));
                      calculateTotals();
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-right"
                    min="0"
                    max="100"
                  />
                  <span>%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount</span>
                <div className="flex items-center gap-2">
                  <span>₹</span>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, discount: Number(e.target.value) }));
                      calculateTotals();
                    }}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-right"
                    min="0"
                  />
                </div>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-blue-600">{formatCurrency(formData.total)}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Payment Terms</h3>
            <div className="space-y-4">
              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                required
              />
            </div>
          </Card>

          <div className="space-y-2">
            <Button type="submit" className="w-full">
              Generate Invoice
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;