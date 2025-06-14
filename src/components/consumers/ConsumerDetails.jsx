import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Trash,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  CreditCard,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";
import axios from "axios";
import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";

const ConsumerDetails = ({ consumerId, onBack, onEdit }) => {
  const [consumer, setConsumer] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://abuses-admin-backend.onrender.com";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "bookings", label: "Bookings" },
    { id: "payments", label: "Payments" },
    { id: "documents", label: "Documents" },
  ];

  // Static data as placeholder (replace with API calls when endpoints are available)
  const recentBookings = [
    {
      id: 1,
      bookingNumber: "BK-2024-001",
      date: "2024-01-15",
      route: "Delhi → Agra",
      amount: 45000,
      status: "completed",
    },
    {
      id: 2,
      bookingNumber: "BK-2024-008",
      date: "2024-01-10",
      route: "Delhi → Jaipur",
      amount: 55000,
      status: "ongoing",
    },
  ];

  const recentPayments = [
    {
      id: 1,
      date: "2024-01-14",
      amount: 25000,
      mode: "Bank Transfer",
      invoice: "INV-2024-001",
    },
    {
      id: 2,
      date: "2024-01-10",
      amount: 15000,
      mode: "UPI",
      invoice: "INV-2024-008",
    },
  ];

  useEffect(() => {
    const fetchConsumer = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}/api/consumers/${consumerId}`
        );
        setConsumer(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch consumer details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (consumerId) {
      fetchConsumer();
    }
  }, [consumerId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !consumer) {
    return (
      <div className="container mx-auto p-6">
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
          Back
        </Button>
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <span className="block sm:inline">
            {error || "Consumer not found"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {consumer.name}
            </h2>
            {consumer.company && (
              <p className="text-gray-600 flex items-center gap-1">
                <Building size={16} />
                {consumer.company}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(consumer)}
            disabled={isLoading}
          >
            Edit
          </Button>
          <Button variant="danger" size="sm" icon={Trash} disabled={isLoading}>
            Delete
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            disabled={isLoading}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{consumer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{consumer.email || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{consumer.address || "N/A"}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.bookingNumber}</p>
                      <p className="text-sm text-gray-600">
                        {booking.route} • {formatDate(booking.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(booking.amount)}
                      </p>
                      <Badge
                        variant={
                          booking.status === "completed" ? "success" : "warning"
                        }
                        size="xs"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Customer Type</p>
                  <Badge variant="primary" size="md">
                    {consumer.type || "Regular"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">
                    {consumer.totalBookings || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(consumer.totalAmount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credit Limit</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(consumer.creditLimit || 0)}
                  </p>
                </div>
                {consumer.outstandingAmount > 0 && (
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">Outstanding Amount</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(consumer.outstandingAmount)}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  disabled={isLoading}
                >
                  New Booking
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={FileText}
                  className="w-full"
                  disabled={isLoading}
                >
                  View Statement
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={CreditCard}
                  className="w-full"
                  disabled={isLoading}
                >
                  Record Payment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Booking History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookingNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(booking.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(booking.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          booking.status === "completed" ? "success" : "warning"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "payments" && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.invoice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.mode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConsumerDetails;

// import React, { useState } from 'react';
// import {
//   ArrowLeft, Edit, Trash, Phone, Mail, MapPin, Building,
//   Calendar, CreditCard, FileText, TrendingUp, Clock
// } from 'lucide-react';
// import Card from '../common/Card';
// import Button from '../common/Button';
// import Badge from '../common/Badge';
// import { formatCurrency, formatDate } from '../../utils/formatters';

// const ConsumerDetails = ({ consumer, onBack, onEdit }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const tabs = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'bookings', label: 'Bookings' },
//     { id: 'payments', label: 'Payments' },
//     { id: 'documents', label: 'Documents' },
//   ];

//   const recentBookings = [
//     {
//       id: 1,
//       bookingNumber: 'BK-2024-001',
//       date: '2024-01-15',
//       route: 'Delhi → Agra',
//       amount: 45000,
//       status: 'completed'
//     },
//     {
//       id: 2,
//       bookingNumber: 'BK-2024-008',
//       date: '2024-01-10',
//       route: 'Delhi → Jaipur',
//       amount: 55000,
//       status: 'ongoing'
//     }
//   ];

//   const recentPayments = [
//     {
//       id: 1,
//       date: '2024-01-14',
//       amount: 25000,
//       mode: 'Bank Transfer',
//       invoice: 'INV-2024-001'
//     },
//     {
//       id: 2,
//       date: '2024-01-10',
//       amount: 15000,
//       mode: 'UPI',
//       invoice: 'INV-2024-008'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="sm"
//             icon={ArrowLeft}
//             onClick={onBack}
//           >
//             Back
//           </Button>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">{consumer.name}</h2>
//             {consumer.company && (
//               <p className="text-gray-600 flex items-center gap-1">
//                 <Building size={16} />
//                 {consumer.company}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" icon={Edit} onClick={onEdit}>
//             Edit
//           </Button>
//           <Button variant="danger" size="sm" icon={Trash}>
//             Delete
//           </Button>
//         </div>
//       </div>

//       <div className="flex gap-2 border-b">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-4 py-2 font-medium transition-colors ${
//               activeTab === tab.id
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {activeTab === 'overview' && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3">
//                   <Phone className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Phone</p>
//                     <p className="font-medium">{consumer.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Email</p>
//                     <p className="font-medium">{consumer.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 md:col-span-2">
//                   <MapPin className="text-gray-400 mt-1" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Address</p>
//                     <p className="font-medium">{consumer.address}</p>
//                   </div>
//                 </div>
//               </div>
//               {consumer.gst && (
//                 <div className="mt-4 pt-4 border-t">
//                   <p className="text-sm text-gray-600">GST Number</p>
//                   <p className="font-medium">{consumer.gst}</p>
//                 </div>
//               )}
//             </Card>

//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
//               <div className="space-y-4">
//                 {recentBookings.slice(0, 3).map((booking) => (
//                   <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium">{booking.bookingNumber}</p>
//                       <p className="text-sm text-gray-600">{booking.route} • {formatDate(booking.date)}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium">{formatCurrency(booking.amount)}</p>
//                       <Badge variant={booking.status === 'completed' ? 'success' : 'warning'} size="xs">
//                         {booking.status}
//                       </Badge>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Statistics</h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Customer Type</p>
//                   <Badge variant="primary" size="md">
//                     {consumer.type}
//                   </Badge>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Bookings</p>
//                   <p className="text-2xl font-bold">{consumer.totalBookings}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Revenue</p>
//                   <p className="text-2xl font-bold">{formatCurrency(consumer.totalAmount)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Credit Limit</p>
//                   <p className="text-lg font-semibold">{formatCurrency(consumer.creditLimit)}</p>
//                 </div>
//                 {consumer.outstandingAmount > 0 && (
//                   <div className="p-3 bg-red-50 rounded-lg">
//                     <p className="text-sm text-red-600">Outstanding Amount</p>
//                     <p className="text-xl font-bold text-red-600">{formatCurrency(consumer.outstandingAmount)}</p>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//               <div className="space-y-2">
//                 <Button variant="primary" size="sm" className="w-full">
//                   New Booking
//                 </Button>
//                 <Button variant="outline" size="sm" icon={FileText} className="w-full">
//                   View Statement
//                 </Button>
//                 <Button variant="outline" size="sm" icon={CreditCard} className="w-full">
//                   Record Payment
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         </div>
//       )}

//       {activeTab === 'bookings' && (
//         <Card>
//           <h3 className="text-lg font-semibold mb-4">Booking History</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Booking ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Route
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentBookings.map((booking) => (
//                   <tr key={booking.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {booking.bookingNumber}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(booking.date)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {booking.route}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(booking.amount)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <Badge variant={booking.status === 'completed' ? 'success' : 'warning'}>
//                         {booking.status}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {activeTab === 'payments' && (
//         <Card>
//           <h3 className="text-lg font-semibold mb-4">Payment History</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Invoice
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Mode
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentPayments.map((payment) => (
//                   <tr key={payment.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(payment.date)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {payment.invoice}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(payment.amount)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {payment.mode}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ConsumerDetails;
