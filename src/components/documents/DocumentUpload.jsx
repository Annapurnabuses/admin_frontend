import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const DocumentUpload = ({ onUpload, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    bookingId: '',
    vehicleNumber: '',
    vendorId: '',
    expiryDate: '',
    notes: '',
    file: null
  });

  const [dragActive, setDragActive] = useState(false);

  const documentTypes = {
    vehicle: ['insurance', 'fitness', 'permit', 'rc', 'poc'],
    booking: ['agreement', 'duty_slip', 'passenger_list', 'tour_program', 'invoice'],
    vendor: ['agreement', 'invoice', 'gst_certificate'],
    other: ['general', 'report', 'misc']
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please select a file to upload');
      return;
    }
    onUpload(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => {
              handleChange('category', e.target.value);
              handleChange('type', ''); // Reset type when category changes
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="vehicle">Vehicle Document</option>
            <option value="booking">Booking Document</option>
            <option value="vendor">Vendor Document</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.category}
          >
            <option value="">Select Type</option>
            {formData.category && documentTypes[formData.category].map(type => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      {formData.category === 'vehicle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Number <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.vehicleNumber}
              onChange={(e) => handleChange('vehicleNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Vehicle</option>
              <option value="DL 01 AB 1234">DL 01 AB 1234</option>
              <option value="DL 02 CD 5678">DL 02 CD 5678</option>
              <option value="DL 03 EF 9012">DL 03 EF 9012</option>
            </select>
          </div>
          {['insurance', 'fitness', 'permit', 'poc'].includes(formData.type) && (
            <Input
              label="Expiry Date"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              required
            />
          )}
        </div>
      )}

      {formData.category === 'booking' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking ID <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.bookingId}
            onChange={(e) => handleChange('bookingId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Booking</option>
            <option value="BK-2024-001">BK-2024-001 - Raj Kumar</option>
            <option value="BK-2024-002">BK-2024-002 - Priya Sharma</option>
            <option value="BK-2024-003">BK-2024-003 - Amit Patel</option>
          </select>
        </div>
      )}

      {formData.category === 'vendor' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.vendorId}
            onChange={(e) => handleChange('vendorId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Vendor</option>
            <option value="1">ABC Travels</option>
            <option value="2">XYZ Tours</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any additional notes..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload File <span className="text-red-500">*</span>
        </label>
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {formData.file ? (
            <div className="space-y-2">
              <FileText className="mx-auto text-gray-400" size={48} />
              <p className="text-sm font-medium text-gray-900">{formData.file.name}</p>
              <p className="text-xs text-gray-500">
                {(formData.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleChange('file', null)}
              >
                Remove File
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label htmlFor="file-upload">
                <Button type="button" variant="outline" size="sm">
                  Choose File
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
        <AlertCircle className="text-yellow-600" size={20} />
        <p className="text-sm text-yellow-800">
          Please ensure all documents are clear and readable before uploading.
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Upload Document
        </Button>
      </div>
    </form>
  );
};

export default DocumentUpload;