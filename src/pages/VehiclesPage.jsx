import React, { useEffect, useState } from "react";
import VehicleList from "../components/vehicles/VehicleList";
import VehicleForm from "../components/vehicles/VehicleForm";
import ComplianceReminders from "../components/vehicles/ComplianceReminders";

const VehiclesPage = () => {
  const [view, setView] = useState("list");
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  const vehicles = [
    {
      id: 1,
      number: "DL 01 AB 1234",
      compliance: {
        insurance: { expiry: "2024-06-15" },
        fitness: { expiry: "2024-08-20" },
        permit: { expiry: "2024-01-10" },
        poc: { expiry: "2024-04-30" },
      },
    },
    {
      id: 2,
      number: "DL 02 CD 5678",
      compliance: {
        insurance: { expiry: "2024-07-20" },
        fitness: { expiry: "2024-09-15" },
        permit: { expiry: "2024-12-31" },
        poc: { expiry: "2024-05-20" },
      },
    },
  ];

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setView("form");
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setView("form");
  };

  const handleSave = (formData) => {
    console.log("Save vehicle:", formData);
    setView("list");
    setSelectedVehicle(null);
  };

  const handleCancel = () => {
    setView("list");
    setSelectedVehicle(null);
  };

  return (
    <div>
      {view === "list" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VehicleList
                onSelectVehicle={handleSelectVehicle}
                onAddVehicle={handleAddVehicle}
              />
            </div>
            <div>
              <ComplianceReminders vehicles={vehicles} />
            </div>
          </div>
        </div>
      )}

      {view === "form" && (
        <VehicleForm
          vehicle={selectedVehicle}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default VehiclesPage;
