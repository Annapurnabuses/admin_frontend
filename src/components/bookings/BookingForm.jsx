import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Car,
  User,
  MapPin,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const BookingForm = ({ bookingId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    trip: {
      from: "",
      to: "",
      startDate: "",
      endDate: "",
      purpose: "",
    },
    vehicle: {
      type: "",
      vehicleId: "",
      driverId: "",
    },
    payment: {
      rateType: "km_wise",
      totalAmount: "",
      advanceAmount: "",
      notes: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(!!bookingId);

  const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://abuses-admin-backend.onrender.com";

  useEffect(() => {
    const fetchBooking = async () => {
      setIsFetching(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}/api/bookings/${bookingId}`
        );
        const booking = response.data;
        setFormData({
          customer: {
            name: booking.customer.name || "",
            phone: booking.customer.phone || "",
            email: booking.customer.email || "",
            address: booking.customer.address || "",
          },
          trip: {
            from: booking.trip.from || "",
            to: booking.trip.to || "",
            startDate: booking.trip.startDate
              ? new Date(booking.trip.startDate).toISOString().split("T")[0]
              : "",
            endDate: booking.trip.endDate
              ? new Date(booking.trip.endDate).toISOString().split("T")[0]
              : "",
            purpose: booking.trip.purpose || "",
          },
          vehicle: {
            type: booking.vehicle.type || "",
            vehicleId: booking.vehicle.vehicleId || "",
            driverId: booking.vehicle.driverId || "",
          },
          payment: {
            rateType: booking.payment.rateType || "km_wise",
            totalAmount: booking.payment.total?.toString() || "",
            advanceAmount: booking.payment.advance?.toString() || "",
            notes: booking.payment.notes || "",
          },
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch booking details"
        );
      } finally {
        setIsFetching(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formattedData = {
      ...formData,
      payment: {
        ...formData.payment,
        total: parseFloat(formData.payment.totalAmount) || 0,
        advance: parseFloat(formData.payment.advanceAmount) || 0,
        balance:
          (parseFloat(formData.payment.totalAmount) || 0) -
          (parseFloat(formData.payment.advanceAmount) || 0),
        status:
          parseFloat(formData.payment.advanceAmount) > 0
            ? "partial"
            : "pending",
      },
      trip: {
        ...formData.trip,
        totalDays:
          formData.trip.startDate && formData.trip.endDate
            ? Math.ceil(
                (new Date(formData.trip.endDate) -
                  new Date(formData.trip.startDate)) /
                  (1000 * 60 * 60 * 24)
              ) + 1
            : 0,
      },
    };

    try {
      if (bookingId) {
        await axios.patch(
          `${API_URL}/api/bookings/${bookingId}`,
          formattedData
        );
      } else {
        await axios.post(`${API_URL}/api/bookings`, formattedData);
      }
      onSave();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Failed to ${bookingId ? "update" : "create"} booking`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            disabled={isLoading || isFetching}
          >
            Back
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {bookingId ? "Edit Booking" : "New Booking"}
          </h2>
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Customer Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Customer Name"
              value={formData.customer.name}
              onChange={(e) => handleChange("customer", "name", e.target.value)}
              required
              disabled={isLoading || isFetching}
            />
            <Input
              label="Phone Number"
              value={formData.customer.phone}
              onChange={(e) =>
                handleChange("customer", "phone", e.target.value)
              }
              required
              disabled={isLoading || isFetching}
            />
            <Input
              label="Email"
              type="email"
              value={formData.customer.email}
              onChange={(e) =>
                handleChange("customer", "email", e.target.value)
              }
              disabled={isLoading || isFetching}
            />
            <Input
              label="Address"
              value={formData.customer.address}
              onChange={(e) =>
                handleChange("customer", "address", e.target.value)
              }
              disabled={isLoading || isFetching}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Trip Details</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="From"
              value={formData.trip.from}
              onChange={(e) => handleChange("trip", "from", e.target.value)}
              required
              disabled={isLoading || isFetching}
            />
            <Input
              label="To"
              value={formData.trip.to}
              onChange={(e) => handleChange("trip", "to", e.target.value)}
              required
              disabled={isLoading || isFetching}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={formData.trip.startDate}
                onChange={(e) =>
                  handleChange("trip", "startDate", e.target.value)
                }
                required
                disabled={isLoading || isFetching}
              />
              <Input
                label="End Date"
                type="date"
                value={formData.trip.endDate}
                onChange={(e) =>
                  handleChange("trip", "endDate", e.target.value)
                }
                required
                disabled={isLoading || isFetching}
              />
            </div>
            <Input
              label="Purpose"
              value={formData.trip.purpose}
              onChange={(e) => handleChange("trip", "purpose", e.target.value)}
              disabled={isLoading || isFetching}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Car size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Vehicle Assignment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                value={formData.vehicle.type}
                onChange={(e) =>
                  handleChange("vehicle", "type", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading || isFetching}
              >
                <option value="">Select Vehicle Type</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
                <option value="tempo">Tempo Traveller</option>
                <option value="mini-bus">Mini Bus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle
              </label>
              <select
                value={formData.vehicle.vehicleId}
                onChange={(e) =>
                  handleChange("vehicle", "vehicleId", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isFetching}
              >
                <option value="">Select Vehicle</option>
                <option value="1">DL 01 AB 1234 - Bus 45 Seater</option>
                <option value="2">DL 02 CD 5678 - Innova</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Driver
              </label>
              <select
                value={formData.vehicle.driverId}
                onChange={(e) =>
                  handleChange("vehicle", "driverId", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isFetching}
              >
                <option value="">Select Driver</option>
                <option value="1">Ramesh Kumar</option>
                <option value="2">Suresh Singh</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Payment Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate Type
              </label>
              <select
                value={formData.payment.rateType}
                onChange={(e) =>
                  handleChange("payment", "rateType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isFetching}
              >
                <option value="km_wise">KM Wise</option>
                <option value="lumpsum">Lumpsum</option>
                <option value="daily_wages">Daily Wages</option>
              </select>
            </div>
            <Input
              label="Total Amount"
              type="number"
              value={formData.payment.totalAmount}
              onChange={(e) =>
                handleChange("payment", "totalAmount", e.target.value)
              }
              prefix="₹"
              required
              disabled={isLoading || isFetching}
            />
            <Input
              label="Advance Amount"
              type="number"
              value={formData.payment.advanceAmount}
              onChange={(e) =>
                handleChange("payment", "advanceAmount", e.target.value)
              }
              prefix="₹"
              disabled={isLoading || isFetching}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.payment.notes}
                onChange={(e) =>
                  handleChange("payment", "notes", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isFetching}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading || isFetching}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || isFetching}>
          {bookingId ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;

// ========================

// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   Calendar,
//   Car,
//   User,
//   MapPin,
//   DollarSign,
// } from "lucide-react";
// import axios from "axios";
// import Card from "../common/Card";
// import Button from "../common/Button";
// import Input from "../common/Input";

// const BookingForm = ({ booking, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     customer: {
//       name: booking?.customer?.name || "",
//       phone: booking?.customer?.phone || "",
//       email: booking?.customer?.email || "",
//       address: booking?.customer?.address || "",
//     },
//     trip: {
//       from: booking?.trip?.from || "",
//       to: booking?.trip?.to || "",
//       startDate: booking?.trip?.startDate
//         ? booking.trip.startDate.split("T")[0]
//         : "",
//       endDate: booking?.trip?.endDate ? booking.trip.endDate.split("T")[0] : "",
//       purpose: booking?.trip?.purpose || "",
//     },
//     vehicle: {
//       type: booking?.vehicle?.type || "",
//       vehicleId: "684bf2a19172eca5dab9fc77", //  booking?.vehicle?.vehicleId ||
//       driverId: "684bf2a19172eca5dab9fc77", // booking?.vehicle?.driverId ||
//     },
//     payment: {
//       rateType: booking?.payment?.rateType || "km_wise",
//       totalAmount: booking?.payment?.totalAmount || "",
//       advanceAmount: booking?.payment?.advanceAmount || "",
//       notes: booking?.payment?.notes || "",
//     },
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const API_URL =
//     import.meta.env.VITE_BACKEND_URL ||
//     "https://abuses-admin-backend.onrender.com";

//   const handleChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     const formattedData = {
//       ...formData,
//       payment: {
//         ...formData.payment,
//         total: parseFloat(formData.payment.totalAmount) || 0,
//         advance: parseFloat(formData.payment.advanceAmount) || 0,
//         balance:
//           (parseFloat(formData.payment.totalAmount) || 0) -
//           (parseFloat(formData.payment.advanceAmount) || 0),
//         status:
//           parseFloat(formData.payment.advanceAmount) > 0
//             ? "partial"
//             : "pending",
//       },
//       trip: {
//         ...formData.trip,
//         totalDays:
//           formData.trip.startDate && formData.trip.endDate
//             ? Math.ceil(
//                 (new Date(formData.trip.endDate) -
//                   new Date(formData.trip.startDate)) /
//                   (1000 * 60 * 60 * 24)
//               ) + 1
//             : 0,
//       },
//     };

//     try {
//       await axios.post(`${API_URL}/api/bookings`, formattedData);
//       onSave(formattedData);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create booking");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             icon={ArrowLeft}
//             onClick={onCancel}
//             disabled={isLoading}
//           >
//             Back
//           </Button>
//           <h2 className="text-2xl font-bold text-gray-900">
//             {booking ? "Edit Booking" : "New Booking"}
//           </h2>
//         </div>
//       </div>

//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//           role="alert"
//         >
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <User size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Customer Information</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="Customer Name"
//               value={formData.customer.name}
//               onChange={(e) => handleChange("customer", "name", e.target.value)}
//               required
//               disabled={isLoading}
//             />
//             <Input
//               label="Phone Number"
//               value={formData.customer.phone}
//               onChange={(e) =>
//                 handleChange("customer", "phone", e.target.value)
//               }
//               required
//               disabled={isLoading}
//             />
//             <Input
//               label="Email"
//               type="email"
//               value={formData.customer.email}
//               onChange={(e) =>
//                 handleChange("customer", "email", e.target.value)
//               }
//               disabled={isLoading}
//             />
//             <Input
//               label="Address"
//               value={formData.customer.address}
//               onChange={(e) =>
//                 handleChange("customer", "address", e.target.value)
//               }
//               disabled={isLoading}
//             />
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <MapPin size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Trip Details</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="From"
//               value={formData.trip.from}
//               onChange={(e) => handleChange("trip", "from", e.target.value)}
//               required
//               disabled={isLoading}
//             />
//             <Input
//               label="To"
//               value={formData.trip.to}
//               onChange={(e) => handleChange("trip", "to", e.target.value)}
//               required
//               disabled={isLoading}
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Start Date"
//                 type="date"
//                 value={formData.trip.startDate}
//                 onChange={(e) =>
//                   handleChange("trip", "startDate", e.target.value)
//                 }
//                 required
//                 disabled={isLoading}
//               />
//               <Input
//                 label="End Date"
//                 type="date"
//                 value={formData.trip.endDate}
//                 onChange={(e) =>
//                   handleChange("trip", "endDate", e.target.value)
//                 }
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//             <Input
//               label="Purpose"
//               value={formData.trip.purpose}
//               onChange={(e) => handleChange("trip", "purpose", e.target.value)}
//               disabled={isLoading}
//             />
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <Car size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Vehicle Assignment</h3>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Vehicle Type
//               </label>
//               <select
//                 value={formData.vehicle.type}
//                 onChange={(e) =>
//                   handleChange("vehicle", "type", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//                 disabled={isLoading}
//               >
//                 <option value="">Select Vehicle Type</option>
//                 <option value="bus">Bus</option>
//                 <option value="car">Car</option>
//                 <option value="tempo">Tempo Traveller</option>
//                 <option value="mini-bus">Mini Bus</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Select Vehicle
//               </label>
//               <select
//                 value={formData.vehicle.vehicleId}
//                 onChange={(e) =>
//                   handleChange("vehicle", "vehicleId", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isLoading}
//               >
//                 <option value="">Select Vehicle</option>
//                 <option value="1">DL 01 AB 1234 - Bus 45 Seater</option>
//                 <option value="2">DL 02 CD 5678 - Innova</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Assign Driver
//               </label>
//               <select
//                 value={formData.vehicle.driverId}
//                 onChange={(e) =>
//                   handleChange("vehicle", "driverId", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isLoading}
//               >
//                 <option value="">Select Driver</option>
//                 <option value="1">Ramesh Kumar</option>
//                 <option value="2">Suresh Singh</option>
//               </select>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <DollarSign size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Payment Details</h3>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Rate Type
//               </label>
//               <select
//                 value={formData.payment.rateType}
//                 onChange={(e) =>
//                   handleChange("payment", "rateType", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isLoading}
//               >
//                 <option value="km_wise">KM Wise</option>
//                 <option value="lumpsum">Lumpsum</option>
//                 <option value="daily_wages">Daily Wages</option>
//               </select>
//             </div>
//             <Input
//               label="Total Amount"
//               type="number"
//               value={formData.payment.totalAmount}
//               onChange={(e) =>
//                 handleChange("payment", "totalAmount", e.target.value)
//               }
//               prefix="₹"
//               required
//               disabled={isLoading}
//             />
//             <Input
//               label="Advance Amount"
//               type="number"
//               value={formData.payment.advanceAmount}
//               onChange={(e) =>
//                 handleChange("payment", "advanceAmount", e.target.value)
//               }
//               prefix="₹"
//               disabled={isLoading}
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Notes
//               </label>
//               <textarea
//                 value={formData.payment.notes}
//                 onChange={(e) =>
//                   handleChange("payment", "notes", e.target.value)
//                 }
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isLoading}
//               />
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="flex justify-end gap-4">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onCancel}
//           disabled={isLoading}
//         >
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isLoading}>
//           {booking ? "Update Booking" : "Create Booking"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default BookingForm;

// import React, { useState } from 'react';
// import { ArrowLeft, Calendar, Car, User, MapPin, DollarSign } from 'lucide-react';
// import Card from '../common/Card';
// import Button from '../common/Button';
// import Input from '../common/Input';

// const BookingForm = ({ booking, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     customer: {
//       name: booking?.customer?.name || '',
//       phone: booking?.customer?.phone || '',
//       email: booking?.customer?.email || '',
//       address: booking?.customer?.address || ''
//     },
//     trip: {
//       from: booking?.trip?.from || '',
//       to: booking?.trip?.to || '',
//       startDate: booking?.trip?.startDate || '',
//       endDate: booking?.trip?.endDate || '',
//       purpose: booking?.trip?.purpose || ''
//     },
//     vehicle: {
//       type: booking?.vehicle?.type || '',
//       vehicleId: booking?.vehicle?.vehicleId || '',
//       driverId: booking?.vehicle?.driverId || ''
//     },
//     payment: {
//       rateType: booking?.payment?.rateType || 'km_wise',
//       totalAmount: booking?.payment?.totalAmount || '',
//       advanceAmount: booking?.payment?.advanceAmount || '',
//       notes: booking?.payment?.notes || ''
//     }
//   });

//   const handleChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             icon={ArrowLeft}
//             onClick={onCancel}
//           >
//             Back
//           </Button>
//           <h2 className="text-2xl font-bold text-gray-900">
//             {booking ? 'Edit Booking' : 'New Booking'}
//           </h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <User size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Customer Information</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="Customer Name"
//               value={formData.customer.name}
//               onChange={(e) => handleChange('customer', 'name', e.target.value)}
//               required
//             />
//             <Input
//               label="Phone Number"
//               value={formData.customer.phone}
//               onChange={(e) => handleChange('customer', 'phone', e.target.value)}
//               required
//             />
//             <Input
//               label="Email"
//               type="email"
//               value={formData.customer.email}
//               onChange={(e) => handleChange('customer', 'email', e.target.value)}
//             />
//             <Input
//               label="Address"
//               value={formData.customer.address}
//               onChange={(e) => handleChange('customer', 'address', e.target.value)}
//             />
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <MapPin size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Trip Details</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="From"
//               value={formData.trip.from}
//               onChange={(e) => handleChange('trip', 'from', e.target.value)}
//               required
//             />
//             <Input
//               label="To"
//               value={formData.trip.to}
//               onChange={(e) => handleChange('trip', 'to', e.target.value)}
//               required
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Start Date"
//                 type="date"
//                 value={formData.trip.startDate}
//                 onChange={(e) => handleChange('trip', 'startDate', e.target.value)}
//                 required
//               />
//               <Input
//                 label="End Date"
//                 type="date"
//                 value={formData.trip.endDate}
//                 onChange={(e) => handleChange('trip', 'endDate', e.target.value)}
//                 required
//               />
//             </div>
//             <Input
//               label="Purpose"
//               value={formData.trip.purpose}
//               onChange={(e) => handleChange('trip', 'purpose', e.target.value)}
//             />
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <Car size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Vehicle Assignment</h3>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Vehicle Type
//               </label>
//               <select
//                 value={formData.vehicle.type}
//                 onChange={(e) => handleChange('vehicle', 'type', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Vehicle Type</option>
//                 <option value="bus">Bus</option>
//                 <option value="car">Car</option>
//                 <option value="tempo">Tempo Traveller</option>
//                 <option value="mini-bus">Mini Bus</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Select Vehicle
//               </label>
//               <select
//                 value={formData.vehicle.vehicleId}
//                 onChange={(e) => handleChange('vehicle', 'vehicleId', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Vehicle</option>
//                 <option value="1">DL 01 AB 1234 - Bus 45 Seater</option>
//                 <option value="2">DL 02 CD 5678 - Innova</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Assign Driver
//               </label>
//               <select
//                 value={formData.vehicle.driverId}
//                 onChange={(e) => handleChange('vehicle', 'driverId', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Driver</option>
//                 <option value="1">Ramesh Kumar</option>
//                 <option value="2">Suresh Singh</option>
//               </select>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <DollarSign size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Payment Details</h3>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Rate Type
//               </label>
//               <select
//                 value={formData.payment.rateType}
//                 onChange={(e) => handleChange('payment', 'rateType', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="km_wise">KM Wise</option>
//                 <option value="lumpsum">Lumpsum</option>
//                 <option value="daily_wages">Daily Wages</option>
//               </select>
//             </div>
//             <Input
//               label="Total Amount"
//               type="number"
//               value={formData.payment.totalAmount}
//               onChange={(e) => handleChange('payment', 'totalAmount', e.target.value)}
//               prefix="₹"
//               required
//             />
//             <Input
//               label="Advance Amount"
//               type="number"
//               value={formData.payment.advanceAmount}
//               onChange={(e) => handleChange('payment', 'advanceAmount', e.target.value)}
//               prefix="₹"
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Notes
//               </label>
//               <textarea
//                 value={formData.payment.notes}
//                 onChange={(e) => handleChange('payment', 'notes', e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="flex justify-end gap-4">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit">
//           {booking ? 'Update Booking' : 'Create Booking'}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default BookingForm;
