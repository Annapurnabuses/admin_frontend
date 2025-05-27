import React, { useState } from 'react';
import { Search, Filter, Plus, Building, Phone, Mail } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import VendorCard from './VendorCard';

const VendorList = ({ onSelectVendor, onAddVendor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const vendors = [
    {
      id: 1,
      name: 'ABC Travels',
      contactPerson: 'Rahul Verma',
      phone: '+91 98765 12345',
      email: 'info@abctravels.com',
      address: '123, Transport Nagar, Delhi',
      gst: '07AAAAA0000A1Z5',
      status: 'active',
      vehicleCount: 12,
      totalBusiness: 850000,
      outstandingAmount: 125000,
      lastTransaction: '2024-01-14'
    },
    {
      id: 2,
      name: 'XYZ Tours',
      contactPerson: 'Priya Singh',
      phone: '+91 98765 67890',
      email: 'contact@xyztours.com',
      address: '456, Bus Stand Road, Mumbai',
      gst: '27BBBBB0000B1Z5',
      status: 'active',
      vehicleCount: 8,
      totalBusiness: 620000,
      outstandingAmount: 0,
      lastTransaction: '2024-01-10'
    },
    {
      id: 3,
      name: 'Quick Cabs',
      contactPerson: 'Amit Sharma',
      phone: '+91 98765 11111',
      email: 'quickcabs@email.com',
      address: '789, Main Market, Bangalore',
      gst: '29CCCCC0000C1Z5',
      status: 'inactive',
      vehicleCount: 5,
      totalBusiness: 220000,
      outstandingAmount: 45000,
      lastTransaction: '2023-12-20'
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.phone.includes(searchQuery);
    
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button icon={Plus} onClick={onAddVendor}>
            Add Vendor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onClick={() => onSelectVendor(vendor)}
          />
        ))}
      </div>
    </div>
  );
};

export default VendorList;