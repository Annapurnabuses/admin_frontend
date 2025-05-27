import React, { useState } from 'react';
import { Search, Filter, Upload, File, FileText, Image, Download, Trash, Eye } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Badge from '../common/Badge';
import DocumentUpload from './DocumentUpload';
import Modal from '../common/Modal';

const DocumentManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    {
      id: 1,
      name: 'Vehicle Insurance - DL 01 AB 1234',
      type: 'insurance',
      fileType: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Admin',
      uploadedDate: '2024-01-10',
      category: 'vehicle',
      vehicleNumber: 'DL 01 AB 1234',
      expiryDate: '2024-06-15'
    },
    {
      id: 2,
      name: 'Booking Agreement - BK-2024-001',
      type: 'agreement',
      fileType: 'pdf',
      size: '1.2 MB',
      uploadedBy: 'Rajesh Kumar',
      uploadedDate: '2024-01-15',
      category: 'booking',
      bookingId: 'BK-2024-001'
    },
    {
      id: 3,
      name: 'Duty Slip - BK-2024-002',
      type: 'duty_slip',
      fileType: 'image',
      size: '856 KB',
      uploadedBy: 'Driver App',
      uploadedDate: '2024-01-14',
      category: 'booking',
      bookingId: 'BK-2024-002'
    },
    {
      id: 4,
      name: 'Fitness Certificate - DL 02 CD 5678',
      type: 'fitness',
      fileType: 'pdf',
      size: '1.8 MB',
      uploadedBy: 'Admin',
      uploadedDate: '2024-01-08',
      category: 'vehicle',
      vehicleNumber: 'DL 02 CD 5678',
      expiryDate: '2024-08-20'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.bookingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || doc.category === filterType;
    
    return matchesSearch && matchesType;
  });

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return FileText;
      case 'image': return Image;
      default: return File;
    }
  };

  const getDocumentTypeLabel = (type) => {
    const labels = {
      insurance: 'Insurance',
      agreement: 'Agreement',
      duty_slip: 'Duty Slip',
      fitness: 'Fitness Certificate',
      permit: 'Permit',
      rc: 'RC Book',
      passenger_list: 'Passenger List',
      tour_program: 'Tour Program'
    };
    return labels[type] || type;
  };

  const handleView = (document) => {
    setSelectedDocument(document);
  };

  const handleDownload = (document) => {
    console.log('Download document:', document.name);
  };

  const handleDelete = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      console.log('Delete document:', documentId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
        <Button icon={Upload} onClick={() => setShowUpload(true)}>
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="vehicle">Vehicle Documents</option>
            <option value="booking">Booking Documents</option>
            <option value="vendor">Vendor Documents</option>
            <option value="other">Other</option>
          </select>
          <Button variant="outline" icon={Filter}>
            More Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => {
          const FileIcon = getFileIcon(document.fileType);
          
          return (
            <Card key={document.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FileIcon size={24} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">{document.size}</p>
                    </div>
                  </div>
                  <Badge variant="default" size="xs">
                    {getDocumentTypeLabel(document.type)}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  {document.bookingId && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-medium">{document.bookingId}</span>
                    </div>
                  )}
                  {document.vehicleNumber && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vehicle</span>
                      <span className="font-medium">{document.vehicleNumber}</span>
                    </div>
                  )}
                  {document.expiryDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Expiry</span>
                      <span className="font-medium text-red-600">{document.expiryDate}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Uploaded by {document.uploadedBy} on {document.uploadedDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => handleView(document)}
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Download}
                    onClick={() => handleDownload(document)}
                    className="flex-1"
                  >
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Trash}
                    onClick={() => handleDelete(document.id)}
                    className="text-red-600 hover:bg-red-50"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        title="Upload Document"
        size="lg"
      >
        <DocumentUpload
          onUpload={(data) => {
            console.log('Upload document:', data);
            setShowUpload(false);
          }}
          onCancel={() => setShowUpload(false)}
        />
      </Modal>
    </div>
  );
};

export default DocumentManager;