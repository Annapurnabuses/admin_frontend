import React, { useState } from 'react';
import { ArrowLeft, User, Shield, Lock, Building } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const TeamForm = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    basic: {
      name: member?.name || '',
      email: member?.email || '',
      phone: member?.phone || '',
      alternatePhone: member?.alternatePhone || '',
      department: member?.department || '',
      designation: member?.designation || '',
      address: member?.address || ''
    },
    access: {
      role: member?.role || 'employee',
      username: member?.username || '',
      password: '',
      confirmPassword: '',
      status: member?.status || 'active'
    },
    permissions: member?.permissions || []
  });

  const availablePermissions = [
    { id: 'bookings', label: 'Bookings Management' },
    { id: 'vehicles', label: 'Vehicles Management' },
    { id: 'consumers', label: 'Consumers Management' },
    { id: 'payments', label: 'Payments & Invoicing' },
    { id: 'expenses', label: 'Expense Tracking' },
    { id: 'vendors', label: 'Vendor Management' },
    { id: 'reports', label: 'Reports & Analytics' },
    { id: 'drivers', label: 'Driver Management' },
    { id: 'documents', label: 'Document Management' },
    { id: 'rates', label: 'Rate Card Management' }
  ];

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.access.password !== formData.access.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
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
            {member ? 'Edit Team Member' : 'Add Team Member'}
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
            <Input
              label="Email"
              type="email"
              value={formData.basic.email}
              onChange={(e) => handleChange('basic', 'email', e.target.value)}
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Department"
                value={formData.basic.department}
                onChange={(e) => handleChange('basic', 'department', e.target.value)}
              />
              <Input
                label="Designation"
                value={formData.basic.designation}
                onChange={(e) => handleChange('basic', 'designation', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.basic.address}
                onChange={(e) => handleChange('basic', 'address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lock size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold">Access Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.access.role}
                  onChange={(e) => handleChange('access', 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                </select>
              </div>
              <Input
                label="Username"
                value={formData.access.username}
                onChange={(e) => handleChange('access', 'username', e.target.value)}
                required
              />
              {!member && (
                <>
                  <Input
                    label="Password"
                    type="password"
                    value={formData.access.password}
                    onChange={(e) => handleChange('access', 'password', e.target.value)}
                    required={!member}
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    value={formData.access.confirmPassword}
                    onChange={(e) => handleChange('access', 'confirmPassword', e.target.value)}
                    required={!member}
                  />
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.access.status}
                  onChange={(e) => handleChange('access', 'status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </Card>

          {formData.access.role !== 'owner' && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold">Permissions</h3>
              </div>
              <div className="space-y-2">
                {availablePermissions.map((permission) => (
                 <label
                   key={permission.id}
                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                 >
                   <input
                     type="checkbox"
                     checked={formData.permissions.includes(permission.id)}
                     onChange={() => togglePermission(permission.id)}
                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                   />
                   <span className="text-sm font-medium text-gray-700">
                     {permission.label}
                   </span>
                 </label>
               ))}
             </div>
           </Card>
         )}
       </div>
     </div>

     <div className="flex justify-end gap-4">
       <Button type="button" variant="outline" onClick={onCancel}>
         Cancel
       </Button>
       <Button type="submit">
         {member ? 'Update Member' : 'Add Member'}
       </Button>
     </div>
   </form>
 );
};

export default TeamForm;