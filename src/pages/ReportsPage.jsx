import React, { useState } from 'react';
import { 
  Download, Calendar, TrendingUp, FileText, 
  DollarSign, Bus, Users, Fuel 
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const reports = [
    {
      id: 'bookings',
      name: 'Bookings Report',
      description: 'Detailed report of all bookings',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'revenue',
      name: 'Revenue Report',
      description: 'Revenue analysis and trends',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'vehicles',
      name: 'Vehicle Utilization',
      description: 'Vehicle usage and efficiency report',
      icon: Bus,
      color: 'purple'
    },
    {
      id: 'customers',
      name: 'Customer Report',
      description: 'Customer analysis and history',
      icon: Users,
      color: 'orange'
    },
    {
      id: 'expenses',
      name: 'Expense Report',
      description: 'Detailed expense breakdown',
      icon: TrendingUp,
      color: 'red'
    },
    {
      id: 'fuel',
      name: 'Fuel Consumption',
      description: 'Fuel usage and mileage report',
      icon: Fuel,
      color: 'yellow'
    }
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }
    console.log('Generate report:', selectedReport, dateRange);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Generate Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Report</option>
              {reports.map(report => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Start Date"
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <Input
            label="End Date"
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>

        <div className="flex justify-end">
          <Button icon={Download} onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card
              key={report.id}
              hover
              onClick={() => setSelectedReport(report.id)}
              className="cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getColorClasses(report.color)}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Revenue Report - January 2024</p>
                <p className="text-sm text-gray-500">Generated on Jan 15, 2024</p>
              </div>
            </div>
            <Button variant="outline" size="sm" icon={Download}>
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Vehicle Utilization - Q4 2023</p>
                <p className="text-sm text-gray-500">Generated on Jan 10, 2024</p>
              </div>
            </div>
            <Button variant="outline" size="sm" icon={Download}>
              Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;