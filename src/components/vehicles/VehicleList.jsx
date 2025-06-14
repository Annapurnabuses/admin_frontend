import React, { useEffect, useState } from "react";
import { Search, Filter, Plus, Car, Bus, AlertTriangle } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import VehicleCard from "./VehicleCard";

const VehicleList = ({ onSelectVehicle, onAddVehicle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    console.log("> vehiclespage");
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/vehicles/`);
        const data = await response.json();
        console.log("> res: ", data.vehicles);

        setVehicles(data.vehicles);
      } catch (error) {
        console.log("> error in fetching vehicles; ", error);
      }
    };

    fetchVehicles();
  }, []);

  const vehiclesDummy = [
    {
      id: 1,
      number: "DL 01 AB 1234",
      type: "bus",
      model: "Volvo 9400",
      capacity: 45,
      status: "available",
      driver: "Ramesh Kumar",
      image: "/api/placeholder/150/100",
      compliance: {
        insurance: { valid: true, expiry: "2024-06-15" },
        fitness: { valid: true, expiry: "2024-08-20" },
        permit: { valid: false, expiry: "2024-01-10" },
        poc: { valid: true, expiry: "2024-04-30" },
      },
      stats: {
        totalTrips: 125,
        totalKms: 45000,
        revenue: 850000,
      },
    },
    {
      id: 2,
      number: "DL 02 CD 5678",
      type: "car",
      model: "Toyota Innova",
      capacity: 7,
      status: "booked",
      driver: "Suresh Singh",
      image: "/api/placeholder/150/100",
      compliance: {
        insurance: { valid: true, expiry: "2024-07-20" },
        fitness: { valid: true, expiry: "2024-09-15" },
        permit: { valid: true, expiry: "2024-12-31" },
        poc: { valid: true, expiry: "2024-05-20" },
      },
      stats: {
        totalTrips: 89,
        totalKms: 25000,
        revenue: 450000,
      },
    },
    {
      id: 3,
      number: "DL 03 EF 9012",
      type: "tempo",
      model: "Force Traveller",
      capacity: 12,
      status: "maintenance",
      driver: "Anil Verma",
      image: "/api/placeholder/150/100",
      compliance: {
        insurance: { valid: false, expiry: "2024-01-05" },
        fitness: { valid: true, expiry: "2024-10-10" },
        permit: { valid: true, expiry: "2024-11-15" },
        poc: { valid: true, expiry: "2024-06-25" },
      },
      stats: {
        totalTrips: 67,
        totalKms: 18000,
        revenue: 320000,
      },
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || vehicle.type === filterType;
    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const hasComplianceIssues = (vehicle) => {
    return Object.values(vehicle.compliance).some((item) => !item.valid);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search vehicles..."
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
            <option value="all">All Types</option>
            <option value="bus">Bus</option>
            <option value="car">Car</option>
            <option value="tempo">Tempo</option>
            <option value="mini-bus">Mini Bus</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <Button icon={Plus} onClick={onAddVehicle}>
            Add Vehicle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.number}
            vehicle={vehicle}
            hasIssues={hasComplianceIssues(vehicle)}
            onClick={() => onSelectVehicle(vehicle)}
          />
          // <p key={vehicle.number}>{vehicle.number}</p>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
