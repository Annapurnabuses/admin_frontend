import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Trash,
  Download,
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  User,
  CreditCard,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
} from "../../utils/formatters";

const BookingDetails = ({ bookingId, onBack, onEdit }) => {
  const [booking, setBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://abuses-admin-backend.onrender.com";

  const tabs = [
    { id: "details", label: "Details" },
    { id: "payment", label: "Payment" },
    { id: "documents", label: "Documents" },
    { id: "timeline", label: "Timeline" },
  ];

  // Map backend timeline actions to icons and colors
  const getTimelineItemProps = (action) => {
    switch (action.toLowerCase()) {
      case "booking created":
        return { icon: Clock, color: "blue" };
      case "advance payment received":
        return { icon: CreditCard, color: "green" };
      case "vehicle assigned":
        return { icon: Car, color: "purple" };
      case "booking confirmed":
      case "status updated to approved":
      case "status updated to completed":
        return { icon: CheckCircle, color: "green" };
      case "status updated to rejected":
        return { icon: CheckCircle, color: "red" };
      default:
        return { icon: Clock, color: "gray" };
    }
  };

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}/api/bookings/${bookingId}`
        );
        setBooking(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch booking details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !booking) {
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
            {error || "Booking not found"}
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
              {booking.bookingNumber}
            </h2>
            <p className="text-gray-600">
              Created on {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            disabled={isLoading}
          >
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(booking)}
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

      {activeTab === "details" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{booking.customer.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{booking.customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{booking.customer.email}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Route</p>
                    <p className="font-medium">
                      {booking.trip.from} → {booking.trip.to}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">
                      {formatDate(booking.trip.startDate)} -{" "}
                      {formatDate(booking.trip.endDate)}
                      <span className="text-gray-600 ml-2">
                        ({booking.trip.totalDays} days)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Vehicle</p>
                    <p className="font-medium">
                      {booking.vehicle.type} • {booking.vehicle.number}
                    </p>
                    <p className="text-sm text-gray-600">
                      Driver: {booking.vehicle.driver}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Status</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Booking Status</p>
                  <Badge
                    variant={
                      booking.status === "approved" ||
                      booking.status === "completed"
                        ? "success"
                        : booking.status === "rejected"
                        ? "danger"
                        : "warning"
                    }
                    size="md"
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <Badge
                    variant={
                      booking.payment.status === "completed"
                        ? "success"
                        : booking.payment.status === "overdue"
                        ? "danger"
                        : "warning"
                    }
                    size="md"
                  >
                    {booking.payment.status}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={MessageSquare}
                  className="w-full"
                  disabled={isLoading}
                >
                  Send WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={FileText}
                  className="w-full"
                  disabled={isLoading}
                >
                  Generate Invoice
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Send}
                  className="w-full"
                  disabled={isLoading}
                >
                  Send Reminder
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "payment" && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(booking.payment.total)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Advance Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(booking.payment.advance)}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Balance Due</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(booking.payment.balance)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "timeline" && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
          <div className="space-y-4">
            {booking.timeline.map((item, index) => {
              const { icon: Icon, color } = getTimelineItemProps(item.action);
              return (
                <div key={index} className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center`}
                    >
                      <Icon size={20} className={`text-${color}-600`} />
                    </div>
                    {index < booking.timeline.length - 1 && (
                      <div className="absolute top-10 left-5 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">
                      by {item.user} • {formatDateTime(item.time)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default BookingDetails;

// =============================================

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Edit,
//   Trash,
//   Download,
//   Send,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   Car,
//   User,
//   CreditCard,
//   FileText,
//   MessageSquare,
//   Clock,
//   CheckCircle,
// } from "lucide-react";
// import axios from "axios";
// import Card from "../common/Card";
// import Button from "../common/Button";
// import Badge from "../common/Badge";
// import {
//   formatCurrency,
//   formatDate,
//   formatDateTime,
// } from "../../utils/formatters";

// const BookingDetails = ({ bookingId, onBack, onEdit }) => {
//   const [booking, setBooking] = useState(null);
//   const [activeTab, setActiveTab] = useState("details");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const API_URL =
//     import.meta.env.VITE_BACKEND_URL ||
//     "https://abuses-admin-backend.onrender.com";

//   const tabs = [
//     { id: "details", label: "Details" },
//     { id: "payment", label: "Payment" },
//     { id: "documents", label: "Documents" },
//     { id: "timeline", label: "Timeline" },
//   ];

//   // Map backend timeline actions to icons and colors
//   const getTimelineItemProps = (action) => {
//     switch (action.toLowerCase()) {
//       case "booking created":
//         return { icon: Clock, color: "blue" };
//       case "advance payment received":
//         return { icon: CreditCard, color: "green" };
//       case "vehicle assigned":
//         return { icon: Car, color: "purple" };
//       case "booking confirmed":
//       case "status updated to approved":
//       case "status updated to completed":
//         return { icon: CheckCircle, color: "green" };
//       case "status updated to rejected":
//         return { icon: CheckCircle, color: "red" };
//       default:
//         return { icon: Clock, color: "gray" };
//     }
//   };

//   useEffect(() => {
//     const fetchBooking = async () => {
//       setIsLoading(true);
//       setError("");
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/bookings/${bookingId}`
//         );
//         setBooking(response.data);
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to fetch booking details"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (bookingId) {
//       fetchBooking();
//     }
//   }, [bookingId]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error || !booking) {
//     return (
//       <div className="container mx-auto p-6">
//         <Button variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
//           Back
//         </Button>
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
//           role="alert"
//         >
//           <span className="block sm:inline">
//             {error || "Booking not found"}
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="sm"
//             icon={ArrowLeft}
//             onClick={onBack}
//             disabled={isLoading}
//           >
//             Back
//           </Button>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {booking.bookingNumber}
//             </h2>
//             <p className="text-gray-600">
//               Created on {formatDate(booking.createdAt)}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             icon={Download}
//             disabled={isLoading}
//           >
//             Download
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             icon={Edit}
//             onClick={() => onEdit(booking)}
//             disabled={isLoading}
//           >
//             Edit
//           </Button>
//           <Button variant="danger" size="sm" icon={Trash} disabled={isLoading}>
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
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-600 hover:text-gray-900"
//             }`}
//             disabled={isLoading}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {activeTab === "details" && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <h3 className="text-lg font-semibold mb-4">
//                 Customer Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3">
//                   <User className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Name</p>
//                     <p className="font-medium">{booking.customer.name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Phone</p>
//                     <p className="font-medium">{booking.customer.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Email</p>
//                     <p className="font-medium">{booking.customer.email}</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-gray-400 mt-1" size={20} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600">Route</p>
//                     <p className="font-medium">
//                       {booking.trip.from} → {booking.trip.to}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Calendar className="text-gray-400 mt-1" size={20} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600">Duration</p>
//                     <p className="font-medium">
//                       {formatDate(booking.trip.startDate)} -{" "}
//                       {formatDate(booking.trip.endDate)}
//                       <span className="text-gray-600 ml-2">
//                         ({booking.trip.totalDays} days)
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Car className="text-gray-400 mt-1" size={20} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600">Vehicle</p>
//                     <p className="font-medium">
//                       {booking.vehicle.type} • {booking.vehicle.number}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Driver: {booking.vehicle.driver}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Status</h3>
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Booking Status</p>
//                   <Badge
//                     variant={
//                       booking.status === "approved" ||
//                       booking.status === "completed"
//                         ? "success"
//                         : booking.status === "rejected"
//                         ? "danger"
//                         : "warning"
//                     }
//                     size="md"
//                   >
//                     {booking.status}
//                   </Badge>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Payment Status</p>
//                   <Badge
//                     variant={
//                       booking.payment.status === "completed"
//                         ? "success"
//                         : booking.payment.status === "overdue"
//                         ? "danger"
//                         : "warning"
//                     }
//                     size="md"
//                   >
//                     {booking.payment.status}
//                   </Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//               <div className="space-y-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   icon={MessageSquare}
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   Send WhatsApp
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   icon={FileText}
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   Generate Invoice
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   icon={Send}
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   Send Reminder
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         </div>
//       )}

//       {activeTab === "payment" && (
//         <Card>
//           <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Total Amount</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(booking.payment.total)}
//                 </p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Advance Paid</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {formatCurrency(booking.payment.advance)}
//                 </p>
//               </div>
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Balance Due</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {formatCurrency(booking.payment.balance)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}

//       {activeTab === "timeline" && (
//         <Card>
//           <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
//           <div className="space-y-4">
//             {booking.timeline.map((item, index) => {
//               const { icon: Icon, color } = getTimelineItemProps(item.action);
//               return (
//                 <div key={index} className="flex gap-4">
//                   <div className="relative">
//                     <div
//                       className={`w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center`}
//                     >
//                       <Icon size={20} className={`text-${color}-600`} />
//                     </div>
//                     {index < booking.timeline.length - 1 && (
//                       <div className="absolute top-10 left-5 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
//                     )}
//                   </div>
//                   <div className="flex-1 pb-8">
//                     <p className="font-medium text-gray-900">{item.action}</p>
//                     <p className="text-sm text-gray-600">
//                       by {item.user} • {formatDateTime(item.time)}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;

// ===========================================

// import React, { useState } from 'react';
// import {
//   ArrowLeft, Edit, Trash, Download, Send, Phone, Mail,
//   MapPin, Calendar, Car, User, CreditCard, FileText,
//   MessageSquare, Clock, CheckCircle
// } from 'lucide-react';
// import Card from '../common/Card';
// import Button from '../common/Button';
// import Badge from '../common/Badge';
// import { formatCurrency, formatDate, formatDateTime } from '../../utils/formatters';

// const BookingDetails = ({ booking, onBack, onEdit }) => {
//   const [activeTab, setActiveTab] = useState('details');

//   const tabs = [
//     { id: 'details', label: 'Details' },
//     { id: 'payment', label: 'Payment' },
//     { id: 'documents', label: 'Documents' },
//     { id: 'timeline', label: 'Timeline' },
//   ];

//   const timeline = [
//     {
//       id: 1,
//       action: 'Booking Created',
//       user: 'Raj Kumar',
//       time: '2024-01-10 10:30 AM',
//       icon: Clock,
//       color: 'blue'
//     },
//     {
//       id: 2,
//       action: 'Advance Payment Received',
//       user: 'Admin',
//       time: '2024-01-11 02:15 PM',
//       icon: CreditCard,
//       color: 'green'
//     },
//     {
//       id: 3,
//       action: 'Vehicle Assigned',
//       user: 'Admin',
//       time: '2024-01-12 09:45 AM',
//       icon: Car,
//       color: 'purple'
//     },
//     {
//       id: 4,
//       action: 'Booking Confirmed',
//       user: 'Admin',
//       time: '2024-01-12 10:00 AM',
//       icon: CheckCircle,
//       color: 'green'
//     },
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
//             <h2 className="text-2xl font-bold text-gray-900">{booking.bookingNumber}</h2>
//             <p className="text-gray-600">Created on {formatDate(booking.createdAt)}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" icon={Download}>
//             Download
//           </Button>
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

//       {activeTab === 'details' && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3">
//                   <User className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Name</p>
//                     <p className="font-medium">{booking.customer.name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Phone</p>
//                     <p className="font-medium">{booking.customer.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-600">Email</p>
//                     <p className="font-medium">{booking.customer.email}</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-gray-400 mt-1" size={20} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600">Route</p>
//                     <p className="font-medium">{booking.trip.from} → {booking.trip.to}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Calendar className="text-gray-400 mt-1" size={20} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600">Duration</p>
//                     <p className="font-medium">
//                       {formatDate(booking.trip.startDate)} - {formatDate(booking.trip.endDate)}
//                       <span className="text-gray-600 ml-2">({booking.trip.totalDays} days)</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Car className="text-gray-400 mt-1" size={20} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600">Vehicle</p>
//                     <p className="font-medium">{booking.vehicle.type} • {booking.vehicle.number}</p>
//                     <p className="text-sm text-gray-600">Driver: {booking.vehicle.driver}</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Status</h3>
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Booking Status</p>
//                   <Badge variant="success" size="md">
//                     {booking.status}
//                   </Badge>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Payment Status</p>
//                   <Badge variant="warning" size="md">
//                     {booking.payment.status}
//                   </Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card>
//               <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//               <div className="space-y-2">
//                 <Button variant="outline" size="sm" icon={MessageSquare} className="w-full">
//                   Send WhatsApp
//                 </Button>
//                 <Button variant="outline" size="sm" icon={FileText} className="w-full">
//                   Generate Invoice
//                 </Button>
//                 <Button variant="outline" size="sm" icon={Send} className="w-full">
//                   Send Reminder
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         </div>
//       )}

//       {activeTab === 'payment' && (
//         <Card>
//           <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Total Amount</p>
//                 <p className="text-2xl font-bold text-gray-900">{formatCurrency(booking.payment.total)}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Advance Paid</p>
//                 <p className="text-2xl font-bold text-green-600">{formatCurrency(booking.payment.advance)}</p>
//               </div>
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Balance Due</p>
//                 <p className="text-2xl font-bold text-red-600">{formatCurrency(booking.payment.balance)}</p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}

//       {activeTab === 'timeline' && (
//         <Card>
//           <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
//           <div className="space-y-4">
//             {timeline.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <div key={item.id} className="flex gap-4">
//                   <div className="relative">
//                     <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
//                       <Icon size={20} className={`text-${item.color}-600`} />
//                     </div>
//                     {index < timeline.length - 1 && (
//                       <div className="absolute top-10 left-5 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
//                     )}
//                   </div>
//                   <div className="flex-1 pb-8">
//                     <p className="font-medium text-gray-900">{item.action}</p>
//                     <p className="text-sm text-gray-600">by {item.user} • {item.time}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;
