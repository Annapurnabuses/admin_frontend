import React from 'react';
import { AlertTriangle, Shield, Calendar, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';

const ComplianceReminders = ({ vehicles }) => {
  const getComplianceItems = () => {
    const items = [];
    
    vehicles.forEach(vehicle => {
      Object.entries(vehicle.compliance).forEach(([type, data]) => {
        const daysUntilExpiry = Math.floor(
          (new Date(data.expiry) - new Date()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysUntilExpiry <= 30) {
          items.push({
            vehicleNumber: vehicle.number,
            type,
            expiry: data.expiry,
            daysUntilExpiry,
            status: daysUntilExpiry < 0 ? 'expired' : daysUntilExpiry <= 7 ? 'critical' : 'warning'
          });
        }
      });
    });
    
    return items.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
  };

  const complianceItems = getComplianceItems();

  const getComplianceLabel = (type) => {
    const labels = {
      insurance: 'Insurance',
      fitness: 'Fitness Certificate',
      permit: 'Permit',
      poc: 'Pollution Certificate'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'expired':
        return <Badge variant="danger">Expired</Badge>;
      case 'critical':
        return <Badge variant="danger">Expires Soon</Badge>;
      case 'warning':
        return <Badge variant="warning">Due Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Compliance Reminders</h3>
        <Badge variant="danger" dot>
          {complianceItems.length} Pending
        </Badge>
      </div>

      {complianceItems.length === 0 ? (
        <div className="text-center py-8">
          <Shield className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-500">All vehicles are compliant</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complianceItems.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  item.status === 'expired' ? 'bg-red-100' :
                  item.status === 'critical' ? 'bg-orange-100' :
                  'bg-yellow-100'
                }`}>
                  <AlertTriangle className={`${
                    item.status === 'expired' ? 'text-red-600' :
                    item.status === 'critical' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.vehicleNumber}</p>
                  <p className="text-sm text-gray-600">{getComplianceLabel(item.type)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatDate(item.expiry)}</p>
                  <p className="text-xs text-gray-500">
                    {item.daysUntilExpiry < 0 
                      ? `${Math.abs(item.daysUntilExpiry)} days overdue`
                      : `${item.daysUntilExpiry} days left`
                    }
                  </p>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      {complianceItems.length > 5 && (
        <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all {complianceItems.length} reminders
        </button>
      )}
    </Card>
  );
};

export default ComplianceReminders;