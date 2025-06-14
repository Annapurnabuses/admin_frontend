import React, { useState, useEffect } from "react";
import { ArrowLeft, Car, FileText, User, Shield, Building } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import axios from "axios";

const VehicleForm = ({ vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    basic: {
      number: vehicle?.number || "",
      type: vehicle?.type || "",
      model: vehicle?.model || "",
      year: vehicle?.year || "",
      capacity: vehicle?.capacity || "",
      fuelType: vehicle?.fuelType || "",
      ownership: vehicle?.ownership || "owned",
    },
    compliance: {
      rcNumber: vehicle?.compliance?.rcNumber || "",
      rcExpiry: vehicle?.compliance?.rcExpiry || "",
      insuranceNumber: vehicle?.compliance?.insuranceNumber || "",
      insuranceExpiry: vehicle?.compliance?.insuranceExpiry || "",
      fitnessExpiry: vehicle?.compliance?.fitnessExpiry || "",
      permitNumber: vehicle?.compliance?.permitNumber || "",
      permitExpiry: vehicle?.compliance?.permitExpiry || "",
      pocExpiry: vehicle?.compliance?.pocExpiry || "",
    },
    driver: {
      name: vehicle?.driver?.name || "",
      phone: vehicle?.driver?.phone || "",
      license: vehicle?.driver?.license || "",
      address: vehicle?.driver?.address || "",
    },
    vendor: {
      vendorId: vehicle?.vendor?.vendorId || "",
      vendorRate: vehicle?.vendor?.vendorRate || "",
      vendorNotes: vehicle?.vendor?.vendorNotes || "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vendors, setVendors] = useState([]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Fetch vendors dynamically (optional)
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        // const response = await axios.get(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/vendors`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        // );
        setVendors([]);
        // setVendors(response.data.vendors || []);
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
      }
    };
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Flatten formData for backend
    const payload = {
      number: formData.basic.number,
      type: formData.basic.type,
      model: formData.basic.model,
      year: formData.basic.year,
      capacity: formData.basic.capacity,
      fuelType: formData.basic.fuelType,
      ownership: formData.basic.ownership,
      compliance: {
        rcNumber: formData.compliance.rcNumber,
        rcExpiry: formData.compliance.rcExpiry,
        insuranceNumber: formData.compliance.insuranceNumber,
        insuranceExpiry: formData.compliance.insuranceExpiry,
        fitnessExpiry: formData.compliance.fitnessExpiry,
        permitNumber: formData.compliance.permitNumber,
        permitExpiry: formData.compliance.permitExpiry,
        pocExpiry: formData.compliance.pocExpiry,
      },
      driver: {
        name: formData.driver.name,
        phone: formData.driver.phone,
        license: formData.driver.license,
        address: formData.driver.address,
      },
      vendor:
        formData.basic.ownership === "vendor"
          ? {
              vendorId: formData.vendor.vendorId,
              vendorRate: formData.vendor.vendorRate,
              vendorNotes: formData.vendor.vendorNotes,
            }
          : undefined,
    };

    try {
      let response;
      // response = await axios.post(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/vehicles`,
      //   payload,
      //   // config
      // );
      // console.log(response.data);
      const token = localStorage.getItem("token"); // Adjust based on your auth setup
      const config = {
        headers: {
          Authorization: `Bearer ${"token"}`,
          "Content-Type": "application/json",
        },
      };

      if (vehicle) {
        // Update existing vehicle
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/vehicles/${
            vehicle._id || vehicle.number
          }`,
          payload,
          config
        );
      } else {
        // Create new vehicle
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/vehicles`,
          payload,
          config
        );
        console.log(response.message);
      }

      onSave(response.data); // Pass the response data to parent component
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while saving the vehicle."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
      )}
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
            {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Car size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Basic Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Vehicle Number"
              value={formData.basic.number}
              onChange={(e) => handleChange("basic", "number", e.target.value)}
              placeholder="DL 01 AB 1234"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={formData.basic.type}
                  onChange={(e) =>
                    handleChange("basic", "type", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="bus">Bus</option>
                  <option value="car">Car</option>
                  <option value="tempo">Tempo Traveller</option>
                  <option value="mini-bus">Mini Bus</option>
                </select>
              </div>
              <Input
                label="Seating Capacity"
                type="number"
                value={formData.basic.capacity}
                onChange={(e) =>
                  handleChange("basic", "capacity", e.target.value)
                }
                required
              />
            </div>
            <Input
              label="Model"
              value={formData.basic.model}
              onChange={(e) => handleChange("basic", "model", e.target.value)}
              placeholder="e.g. Toyota Innova"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Year"
                type="number"
                value={formData.basic.year}
                onChange={(e) => handleChange("basic", "year", e.target.value)}
                placeholder="2023"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={formData.basic.fuelType}
                  onChange={(e) =>
                    handleChange("basic", "fuelType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="diesel">Diesel</option>
                  <option value="petrol">Petrol</option>
                  <option value="cng">CNG</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ownership
              </label>
              <select
                value={formData.basic.ownership}
                onChange={(e) =>
                  handleChange("basic", "ownership", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="owned">Owned</option>
                <option value="vendor">Vendor</option>
                <option value="leased">Leased</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Compliance & Documents</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="RC Number"
                value={formData.compliance.rcNumber}
                onChange={(e) =>
                  handleChange("compliance", "rcNumber", e.target.value)
                }
              />
              <Input
                label="RC Expiry"
                type="date"
                value={formData.compliance.rcExpiry}
                onChange={(e) =>
                  handleChange("compliance", "rcExpiry", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Insurance Number"
                value={formData.compliance.insuranceNumber}
                onChange={(e) =>
                  handleChange("compliance", "insuranceNumber", e.target.value)
                }
              />
              <Input
                label="Insurance Expiry"
                type="date"
                value={formData.compliance.insuranceExpiry}
                onChange={(e) =>
                  handleChange("compliance", "insuranceExpiry", e.target.value)
                }
                required
              />
            </div>
            <Input
              label="Fitness Expiry"
              type="date"
              value={formData.compliance.fitnessExpiry}
              onChange={(e) =>
                handleChange("compliance", "fitnessExpiry", e.target.value)
              }
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Permit Number"
                value={formData.compliance.permitNumber}
                onChange={(e) =>
                  handleChange("compliance", "permitNumber", e.target.value)
                }
              />
              <Input
                label="Permit Expiry"
                type="date"
                value={formData.compliance.permitExpiry}
                onChange={(e) =>
                  handleChange("compliance", "permitExpiry", e.target.value)
                }
                required
              />
            </div>
            <Input
              label="POC Expiry"
              type="date"
              value={formData.compliance.pocExpiry}
              onChange={(e) =>
                handleChange("compliance", "pocExpiry", e.target.value)
              }
              required
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Driver Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Driver Name"
              value={formData.driver.name}
              onChange={(e) => handleChange("driver", "name", e.target.value)}
            />
            <Input
              label="Driver Phone"
              value={formData.driver.phone}
              onChange={(e) => handleChange("driver", "phone", e.target.value)}
            />
            <Input
              label="License Number"
              value={formData.driver.license}
              onChange={(e) =>
                handleChange("driver", "license", e.target.value)
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.driver.address}
                onChange={(e) =>
                  handleChange("driver", "address", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {formData.basic.ownership === "vendor" && (
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Building size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold">Vendor Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Vendor
                </label>
                <select
                  value={formData.vendor.vendorId}
                  onChange={(e) =>
                    handleChange("vendor", "vendorId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Vendor</option>
                  {vendors.length > 0 ? (
                    vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="1">ABC Travels</option>
                      <option value="2">XYZ Tours</option>
                    </>
                  )}
                </select>
              </div>
              <Input
                label="Vendor Rate (per day)"
                type="number"
                value={formData.vendor.vendorRate}
                onChange={(e) =>
                  handleChange("vendor", "vendorRate", e.target.value)
                }
                prefix="₹"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.vendor.vendorNotes}
                  onChange={(e) =>
                    handleChange("vendor", "vendorNotes", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : vehicle ? "Update Vehicle" : "Add Vehicle"}
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;

// import React, { useState } from "react";
// import { ArrowLeft, Car, FileText, User, Shield } from "lucide-react";
// import Card from "../common/Card";
// import Button from "../common/Button";
// import Input from "../common/Input";

// const VehicleForm = ({ vehicle, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     basic: {
//       number: vehicle?.number || "",
//       type: vehicle?.type || "",
//       model: vehicle?.model || "",
//       year: vehicle?.year || "",
//       capacity: vehicle?.capacity || "",
//       fuelType: vehicle?.fuelType || "",
//       ownership: vehicle?.ownership || "owned",
//     },
//     compliance: {
//       rcNumber: vehicle?.compliance?.rcNumber || "",
//       rcExpiry: vehicle?.compliance?.rcExpiry || "",
//       insuranceNumber: vehicle?.compliance?.insuranceNumber || "",
//       insuranceExpiry: vehicle?.compliance?.insuranceExpiry || "",
//       fitnessExpiry: vehicle?.compliance?.fitnessExpiry || "",
//       permitNumber: vehicle?.compliance?.permitNumber || "",
//       permitExpiry: vehicle?.compliance?.permitExpiry || "",
//       pocExpiry: vehicle?.compliance?.pocExpiry || "",
//     },
//     driver: {
//       name: vehicle?.driver?.name || "",
//       phone: vehicle?.driver?.phone || "",
//       license: vehicle?.driver?.license || "",
//       address: vehicle?.driver?.address || "",
//     },
//     vendor: {
//       vendorId: vehicle?.vendor?.vendorId || "",
//       vendorRate: vehicle?.vendor?.vendorRate || "",
//       vendorNotes: vehicle?.vendor?.vendorNotes || "",
//     },
//   });

//   const handleChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
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
//             {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
//           </h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <Car size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Basic Information</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="Vehicle Number"
//               value={formData.basic.number}
//               onChange={(e) => handleChange("basic", "number", e.target.value)}
//               placeholder="DL 01 AB 1234"
//               required
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Vehicle Type
//                 </label>
//                 <select
//                   value={formData.basic.type}
//                   onChange={(e) =>
//                     handleChange("basic", "type", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="bus">Bus</option>
//                   <option value="car">Car</option>
//                   <option value="tempo">Tempo Traveller</option>
//                   <option value="mini-bus">Mini Bus</option>
//                 </select>
//               </div>
//               <Input
//                 label="Seating Capacity"
//                 type="number"
//                 value={formData.basic.capacity}
//                 onChange={(e) =>
//                   handleChange("basic", "capacity", e.target.value)
//                 }
//                 required
//               />
//             </div>
//             <Input
//               label="Model"
//               value={formData.basic.model}
//               onChange={(e) => handleChange("basic", "model", e.target.value)}
//               placeholder="e.g. Toyota Innova"
//               required
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Year"
//                 type="number"
//                 value={formData.basic.year}
//                 onChange={(e) => handleChange("basic", "year", e.target.value)}
//                 placeholder="2023"
//               />
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Fuel Type
//                 </label>
//                 <select
//                   value={formData.basic.fuelType}
//                   onChange={(e) =>
//                     handleChange("basic", "fuelType", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Fuel Type</option>
//                   <option value="diesel">Diesel</option>
//                   <option value="petrol">Petrol</option>
//                   <option value="cng">CNG</option>
//                   <option value="electric">Electric</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Ownership
//               </label>
//               <select
//                 value={formData.basic.ownership}
//                 onChange={(e) =>
//                   handleChange("basic", "ownership", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="owned">Owned</option>
//                 <option value="vendor">Vendor</option>
//                 <option value="leased">Leased</option>
//               </select>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <Shield size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Compliance & Documents</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="RC Number"
//                 value={formData.compliance.rcNumber}
//                 onChange={(e) =>
//                   handleChange("compliance", "rcNumber", e.target.value)
//                 }
//               />
//               <Input
//                 label="RC Expiry"
//                 type="date"
//                 value={formData.compliance.rcExpiry}
//                 onChange={(e) =>
//                   handleChange("compliance", "rcExpiry", e.target.value)
//                 }
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Insurance Number"
//                 value={formData.compliance.insuranceNumber}
//                 onChange={(e) =>
//                   handleChange("compliance", "insuranceNumber", e.target.value)
//                 }
//               />
//               <Input
//                 label="Insurance Expiry"
//                 type="date"
//                 value={formData.compliance.insuranceExpiry}
//                 onChange={(e) =>
//                   handleChange("compliance", "insuranceExpiry", e.target.value)
//                 }
//                 required
//               />
//             </div>
//             <Input
//               label="Fitness Expiry"
//               type="date"
//               value={formData.compliance.fitnessExpiry}
//               onChange={(e) =>
//                 handleChange("compliance", "fitnessExpiry", e.target.value)
//               }
//               required
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 label="Permit Number"
//                 value={formData.compliance.permitNumber}
//                 onChange={(e) =>
//                   handleChange("compliance", "permitNumber", e.target.value)
//                 }
//               />
//               <Input
//                 label="Permit Expiry"
//                 type="date"
//                 value={formData.compliance.permitExpiry}
//                 onChange={(e) =>
//                   handleChange("compliance", "permitExpiry", e.target.value)
//                 }
//                 required
//               />
//             </div>
//             <Input
//               label="POC Expiry"
//               type="date"
//               value={formData.compliance.pocExpiry}
//               onChange={(e) =>
//                 handleChange("compliance", "pocExpiry", e.target.value)
//               }
//               required
//             />
//           </div>
//         </Card>

//         <Card>
//           <div className="flex items-center gap-2 mb-4">
//             <User size={20} className="text-gray-600" />
//             <h3 className="text-lg font-semibold">Driver Information</h3>
//           </div>
//           <div className="space-y-4">
//             <Input
//               label="Driver Name"
//               value={formData.driver.name}
//               onChange={(e) => handleChange("driver", "name", e.target.value)}
//             />
//             <Input
//               label="Driver Phone"
//               value={formData.driver.phone}
//               onChange={(e) => handleChange("driver", "phone", e.target.value)}
//             />
//             <Input
//               label="License Number"
//               value={formData.driver.license}
//               onChange={(e) =>
//                 handleChange("driver", "license", e.target.value)
//               }
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address
//               </label>
//               <textarea
//                 value={formData.driver.address}
//                 onChange={(e) =>
//                   handleChange("driver", "address", e.target.value)
//                 }
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </Card>

//         {formData.basic.ownership === "vendor" && (
//           <Card>
//             <div className="flex items-center gap-2 mb-4">
//               <Building size={20} className="text-gray-600" />
//               <h3 className="text-lg font-semibold">Vendor Information</h3>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Select Vendor
//                 </label>
//                 <select
//                   value={formData.vendor.vendorId}
//                   onChange={(e) =>
//                     handleChange("vendor", "vendorId", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Vendor</option>
//                   <option value="1">ABC Travels</option>
//                   <option value="2">XYZ Tours</option>
//                 </select>
//               </div>
//               <Input
//                 label="Vendor Rate (per day)"
//                 type="number"
//                 value={formData.vendor.vendorRate}
//                 onChange={(e) =>
//                   handleChange("vendor", "vendorRate", e.target.value)
//                 }
//                 prefix="₹"
//               />
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes
//                 </label>
//                 <textarea
//                   value={formData.vendor.vendorNotes}
//                   onChange={(e) =>
//                     handleChange("vendor", "vendorNotes", e.target.value)
//                   }
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </Card>
//         )}
//       </div>

//       <div className="flex justify-end gap-4">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit">
//           {vehicle ? "Update Vehicle" : "Add Vehicle"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default VehicleForm;
