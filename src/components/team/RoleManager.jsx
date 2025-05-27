import React from 'react';
import { Shield, Check, X } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const RoleManager = () => {
  const roles = [
    {
      name: 'Owner',
      description: 'Full system access and control',
      color: 'primary',
      permissions: 'all'
    },
    {
      name: 'Admin',
      description: 'Manage all operations except system settings',
      color: 'info',
      permissions: 'all_except_settings'
    },
    {
      name: 'Employee',
      description: 'Limited access based on assigned permissions',
      color: 'default',
      permissions: 'custom'
    }
  ];

  const permissionMatrix = [
    { feature: 'Bookings Management', owner: true, admin: true, employee: 'custom' },
    { feature: 'Vehicle Management', owner: true, admin: true, employee: 'custom' },
    { feature: 'Consumer Management', owner: true, admin: true, employee: 'custom' },
    { feature: 'Payment & Invoicing', owner: true, admin: true, employee: 'custom' },
    { feature: 'Expense Tracking', owner: true, admin: true, employee: 'custom' },
    { feature: 'Vendor Management', owner: true, admin: true, employee: 'custom' },
    { feature: 'Team Management', owner: true, admin: true, employee: false },
    { feature: 'Reports & Analytics', owner: true, admin: true, employee: 'custom' },
    { feature: 'System Settings', owner: true, admin: false, employee: false },
    { feature: 'Rate Card Management', owner: true, admin: true, employee: 'custom' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <Card key={role.name} className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="text-gray-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">{role.name}</h3>
                <Badge variant={role.color} size="xs">
                  {role.permissions === 'all' ? 'Full Access' : 
                   role.permissions === 'all_except_settings' ? 'Limited Admin' : 
                   'Custom Access'}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600">{role.description}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Permission Matrix</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissionMatrix.map((item) => (
                <tr key={item.feature}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.feature}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.owner === true ? (
                      <Check className="inline-block text-green-600" size={20} />
                    ) : (
                      <X className="inline-block text-red-600" size={20} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.admin === true ? (
                      <Check className="inline-block text-green-600" size={20} />
                    ) : (
                      <X className="inline-block text-red-600" size={20} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.employee === true ? (
                      <Check className="inline-block text-green-600" size={20} />
                    ) : item.employee === false ? (
                      <X className="inline-block text-red-600" size={20} />
                    ) : (
                      <span className="text-xs text-gray-500">Configurable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RoleManager;