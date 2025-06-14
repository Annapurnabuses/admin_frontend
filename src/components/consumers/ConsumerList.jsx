import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import ConsumerCard from "./ConsumerCard";

const ConsumerList = ({ onSelectConsumer, onAddConsumer }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [consumers, setConsumers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://abuses-admin-backend.onrender.com";

  useEffect(() => {
    const fetchConsumers = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(`${API_URL}/api/consumers`);
        setConsumers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch consumers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsumers();
  }, []);

  const filteredConsumers = consumers.filter((consumer) => {
    const matchesSearch =
      consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.phone.includes(searchQuery) ||
      (consumer.email &&
        consumer.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === "all" || consumer.type === filterType;

    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search consumers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="all">All Types</option>
            <option value="regular">Regular</option>
            <option value="corporate">Corporate</option>
            <option value="new">New</option>
          </select>
          <Button icon={Plus} onClick={onAddConsumer} disabled={isLoading}>
            Add Consumer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConsumers.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-600">No consumers found.</p>
          </Card>
        ) : (
          filteredConsumers.map((consumer) => (
            <ConsumerCard
              key={consumer._id}
              consumer={consumer}
              onClick={() => onSelectConsumer(consumer)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConsumerList;

// import React, { useState } from 'react';
// import { Search, Filter, Plus, Phone, Mail, MapPin } from 'lucide-react';
// import Card from '../common/Card';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import ConsumerCard from './ConsumerCard';

// const ConsumerList = ({ onSelectConsumer, onAddConsumer }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');

//   const consumers = [
//     {
//       id: 1,
//       name: 'Raj Kumar',
//       phone: '+91 98765 43210',
//       email: 'raj@example.com',
//       address: '123, Main Street, Delhi',
//       type: 'regular',
//       totalBookings: 15,
//       totalAmount: 450000,
//       lastBooking: '2024-01-15',
//       outstandingAmount: 30000,
//       creditLimit: 100000
//     },
//     {
//       id: 2,
//       name: 'Priya Sharma',
//       phone: '+91 98765 43211',
//       email: 'priya@example.com',
//       address: '456, Park Avenue, Mumbai',
//       type: 'corporate',
//       company: 'ABC Corporation',
//       gst: '22AAAAA0000A1Z5',
//       totalBookings: 32,
//       totalAmount: 1250000,
//       lastBooking: '2024-01-10',
//       outstandingAmount: 0,
//       creditLimit: 500000
//     },
//     {
//       id: 3,
//       name: 'Amit Patel',
//       phone: '+91 98765 43212',
//       email: 'amit@example.com',
//       address: '789, Lake View, Bangalore',
//       type: 'new',
//       totalBookings: 2,
//       totalAmount: 35000,
//       lastBooking: '2024-01-08',
//       outstandingAmount: 15000,
//       creditLimit: 50000
//     }
//   ];

//   const filteredConsumers = consumers.filter(consumer => {
//     const matchesSearch = consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          consumer.phone.includes(searchQuery) ||
//                          consumer.email.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = filterType === 'all' || consumer.type === filterType;

//     return matchesSearch && matchesType;
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <Input
//             placeholder="Search consumers..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             prefix={<Search size={20} className="text-gray-400" />}
//           />
//         </div>
//         <div className="flex gap-2">
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="all">All Types</option>
//             <option value="regular">Regular</option>
//             <option value="corporate">Corporate</option>
//             <option value="new">New</option>
//           </select>
//           <Button icon={Plus} onClick={onAddConsumer}>
//             Add Consumer
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredConsumers.map((consumer) => (
//           <ConsumerCard
//             key={consumer.id}
//             consumer={consumer}
//             onClick={() => onSelectConsumer(consumer)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConsumerList;
