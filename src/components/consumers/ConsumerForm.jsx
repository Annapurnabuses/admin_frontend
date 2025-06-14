import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Building, CreditCard } from "lucide-react";
import axios from "axios";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ConsumerForm = ({ consumerId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "regular",
    company: "",
    gst: "",
    pan: "",
    creditLimit: "",
    paymentTerms: "7",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!consumerId);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://abuses-admin-backend.onrender.com";

  useEffect(() => {
    const fetchConsumer = async () => {
      setIsFetching(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}/api/consumers/${consumerId}`
        );
        const consumer = response.data;
        setFormData({
          name: consumer.name || "",
          phone: consumer.phone || "",
          alternatePhone: consumer.alternatePhone || "",
          email: consumer.email || "",
          address: consumer.address || "",
          city: consumer.city || "",
          state: consumer.state || "",
          pincode: consumer.pincode || "",
          type: consumer.type || "regular",
          company: consumer.company || "",
          gst: consumer.gst || "",
          pan: consumer.pan || "",
          creditLimit: consumer.creditLimit?.toString() || "",
          paymentTerms: consumer.paymentTerms?.toString() || "7",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch consumer details"
        );
      } finally {
        setIsFetching(false);
      }
    };

    if (consumerId) {
      fetchConsumer();
    }
  }, [consumerId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formattedData = {
      ...formData,
      creditLimit: parseFloat(formData.creditLimit) || 0,
      paymentTerms: parseInt(formData.paymentTerms) || 7,
    };

    try {
      if (consumerId) {
        await axios.put(
          `${API_URL}/api/consumers/${consumerId}`,
          formattedData
        );
      } else {
        await axios.post(`${API_URL}/api/consumers`, formattedData);
      }
      onSave();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Failed to ${consumerId ? "update" : "create"} consumer`
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
            {consumerId ? "Edit Consumer" : "Add New Consumer"}
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
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              disabled={isLoading || isFetching}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Primary Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                disabled={isLoading || isFetching}
              />
              <Input
                label="Alternate Phone"
                value={formData.alternatePhone}
                onChange={(e) => handleChange("alternatePhone", e.target.value)}
                disabled={isLoading || isFetching}
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={isLoading || isFetching}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isFetching}
              >
                <option value="regular">Regular</option>
                <option value="corporate">Corporate</option>
                <option value="new">New</option>
              </select>
            </div>
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={isLoading || isFetching}
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                disabled={isLoading || isFetching}
              />
              <Input
                label="State"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                disabled={isLoading || isFetching}
              />
              <Input
                label="Pincode"
                value={formData.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                disabled={isLoading || isFetching}
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {formData.type === "corporate" && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Building size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold">Business Details</h3>
              </div>
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  disabled={isLoading || isFetching}
                />
                <Input
                  label="GST Number"
                  value={formData.gst}
                  onChange={(e) => handleChange("gst", e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                  disabled={isLoading || isFetching}
                />
                <Input
                  label="PAN Number"
                  value={formData.pan}
                  onChange={(e) => handleChange("pan", e.target.value)}
                  placeholder="AAAAA0000A"
                  disabled={isLoading || isFetching}
                />
              </div>
            </Card>
          )}

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold">Credit Details</h3>
            </div>
            <div className="space-y-4">
              <Input
                label="Credit Limit"
                type="number"
                value={formData.creditLimit}
                onChange={(e) => handleChange("creditLimit", e.target.value)}
                prefix="₹"
                disabled={isLoading || isFetching}
              />
              <Input
                label="Payment Terms (days)"
                type="number"
                value={formData.paymentTerms}
                onChange={(e) => handleChange("paymentTerms", e.target.value)}
                disabled={isLoading || isFetching}
              />
            </div>
          </Card>
        </div>
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
          {consumerId ? "Update Consumer" : "Add Consumer"}
        </Button>
      </div>
    </form>
  );
};

export default ConsumerForm;

// import React, { useState } from 'react';
// import { ArrowLeft, User, Building, CreditCard } from 'lucide-react';
// import Card from '../common/Card';
// import Button from '../common/Button';
// import Input from '../common/Input';

// const ConsumerForm = ({ consumer, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     basic: {
//       name: consumer?.name || '',
//       phone: consumer?.phone || '',
//       alternatePhone: consumer?.alternatePhone || '',
//       email: consumer?.email || '',
//       address: consumer?.address || '',
//       city: consumer?.city || '',
//       state: consumer?.state || '',
//       pincode: consumer?.pincode || '',
//       type: consumer?.type || 'regular'
//     },
//     business: {
//       company: consumer?.company || '',
//       gst: consumer?.gst || '',
//       pan: consumer?.pan || '',
//       creditLimit: consumer?.creditLimit || '',
//       paymentTerms: consumer?.paymentTerms || '7'
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
//             {consumer ? 'Edit Consumer' : 'Add New Consumer'}
//           </h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <User size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Personal Information</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="Full Name"
//               value={formData.basic.name}
//               onChange={(e) => handleChange('basic', 'name', e.target.value)}
//               required
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Primary Phone"
//                 value={formData.basic.phone}
//                 onChange={(e) => handleChange('basic', 'phone', e.target.value)}
//                 required
//               />
//               <Input
//                 label="Alternate Phone"
//                 value={formData.basic.alternatePhone}
//                 onChange={(e) => handleChange('basic', 'alternatePhone', e.target.value)}
//               />
//             </div>
//             <Input
//               label="Email"
//               type="email"
//               value={formData.basic.email}
//               onChange={(e) => handleChange('basic', 'email', e.target.value)}
//               required
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Customer Type
//               </label>
//               <select
//                 value={formData.basic.type}
//                 onChange={(e) => handleChange('basic', 'type', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="regular">Regular</option>
//                 <option value="corporate">Corporate</option>
//                 <option value="new">New</option>
//               </select>
//             </div>
//             <Input
//               label="Address"
//               value={formData.basic.address}
//               onChange={(e) => handleChange('basic', 'address', e.target.value)}
//               required
//             />
//             <div className="grid grid-cols-3 gap-4">
//               <Input
//                 label="City"
//                 value={formData.basic.city}
//                 onChange={(e) => handleChange('basic', 'city', e.target.value)}
//                 required
//               />
//               <Input
//                 label="State"
//                 value={formData.basic.state}
//                 onChange={(e) => handleChange('basic', 'state', e.target.value)}
//                 required
//               />
//               <Input
//                 label="Pincode"
//                 value={formData.basic.pincode}
//                 onChange={(e) => handleChange('basic', 'pincode', e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//         </Card>

//         <div className="space-y-6">
//           {formData.basic.type === 'corporate' && (
//             <Card>
//               <div className="flex items-center gap-2 mb-4">
//                 <Building size={20} className="text-gray-600" />
//                 <h3 className="text-lg font-semibold">Business Details</h3>
//               </div>
//               <div className="space-y-4">
//                 <Input
//                   label="Company Name"
//                   value={formData.business.company}
//                   onChange={(e) => handleChange('business', 'company', e.target.value)}
//                   required
//                 />
//                 <Input
//                   label="GST Number"
//                   value={formData.business.gst}
//                   onChange={(e) => handleChange('business', 'gst', e.target.value)}
//                   placeholder="22AAAAA0000A1Z5"
//                 />
//                 <Input
//                   label="PAN Number"
//                   value={formData.business.pan}
//                   onChange={(e) => handleChange('business', 'pan', e.target.value)}
//                   placeholder="AAAAA0000A"
//                 />
//               </div>
//             </Card>
//           )}

//           <Card>
//             <div className="flex items-center gap-2 mb-4">
//               <CreditCard size={20} className="text-gray-600" />
//               <h3 className="text-lg font-semibold">Credit Details</h3>
//             </div>
//             <div className="space-y-4">
//               <Input
//                 label="Credit Limit"
//                 type="number"
//                 value={formData.business.creditLimit}
//                 onChange={(e) => handleChange('business', 'creditLimit', e.target.value)}
//                 prefix="₹"
//               />
//               <Input
//                 label="Payment Terms (days)"
//                 type="number"
//                 value={formData.business.paymentTerms}
//                 onChange={(e) => handleChange('business', 'paymentTerms', e.target.value)}
//               />
//             </div>
//           </Card>
//         </div>
//       </div>

//       <div className="flex justify-end gap-4">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit">
//           {consumer ? 'Update Consumer' : 'Add Consumer'}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ConsumerForm;
