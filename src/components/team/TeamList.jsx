import React, { useState, useEffect } from "react";
import { Search, Plus, User, Shield, Phone, Mail } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import Badge from "../common/Badge";
import axios from "axios";

const TeamList = ({ onSelectMember, onAddMember }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [teamMembers, setTeamMembers] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/team`
      );
      // Ensure response.data is an array; fallback to empty array if not
      setTeamMembers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch team members");
      setTeamMembers([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/team/${id}`
        );
        setTeamMembers(teamMembers.filter((member) => member._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete team member");
      }
    }
  };

  // Defensive check: ensure teamMembers is an array before filtering
  const filteredMembers = Array.isArray(teamMembers)
    ? teamMembers.filter((member) => {
        const matchesSearch =
          (member.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (member.email || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (member.phone && member.phone.includes(searchQuery));

        const matchesRole = filterRole === "all" || member.role === filterRole;

        return matchesSearch && matchesRole;
      })
    : [];

  const getRoleColor = (role) => {
    switch (role) {
      case "owner":
        return "primary";
      case "admin":
        return "info";
      case "employee":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={20} className="text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          <Button icon={Plus} onClick={onAddMember}>
            Add Member
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member._id} hover className="cursor-pointer relative">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-center gap-3"
                    onClick={() => onSelectMember(member)}
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {member.department || "N/A"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={member.status === "active" ? "success" : "default"}
                    size="xs"
                  >
                    {member.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} />
                    <span>{member.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gray-600" />
                    <Badge variant={getRoleColor(member.role)} size="sm">
                      {member.role}
                    </Badge>
                  </div>
                </div>

                {member.permissions && member.permissions.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {member.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="danger"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(member._id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;

// import React, { useState } from 'react';
// import { Search, Plus, User, Shield, Phone, Mail } from 'lucide-react';
// import Card from '../common/Card';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import Badge from '../common/Badge';

// const TeamList = ({ onSelectMember, onAddMember }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterRole, setFilterRole] = useState('all');

//   const teamMembers = [
//     {
//       id: 1,
//       name: 'Rajesh Kumar',
//       email: 'rajesh@annapurna.com',
//       phone: '+91 98765 43210',
//       role: 'admin',
//       department: 'Operations',
//       status: 'active',
//       joinDate: '2023-06-15',
//       lastActive: '2024-01-15'
//     },
//     {
//       id: 2,
//       name: 'Priya Patel',
//       email: 'priya@annapurna.com',
//       phone: '+91 98765 43211',
//       role: 'employee',
//       department: 'Accounts',
//       permissions: ['bookings', 'payments'],
//       status: 'active',
//       joinDate: '2023-08-20',
//       lastActive: '2024-01-15'
//     },
//     {
//       id: 3,
//       name: 'Amit Singh',
//       email: 'amit@annapurna.com',
//       phone: '+91 98765 43212',
//       role: 'employee',
//       department: 'Operations',
//       permissions: ['vehicles', 'drivers'],
//       status: 'inactive',
//       joinDate: '2023-10-10',
//       lastActive: '2024-01-01'
//     }
//   ];

//   const filteredMembers = teamMembers.filter(member => {
//     const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          member.phone.includes(searchQuery);

//     const matchesRole = filterRole === 'all' || member.role === filterRole;

//     return matchesSearch && matchesRole;
//   });

//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'owner': return 'primary';
//       case 'admin': return 'info';
//       case 'employee': return 'default';
//       default: return 'default';
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <Input
//             placeholder="Search team members..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             prefix={<Search size={20} className="text-gray-400" />}
//           />
//         </div>
//         <div className="flex gap-2">
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="all">All Roles</option>
//             <option value="owner">Owner</option>
//             <option value="admin">Admin</option>
//             <option value="employee">Employee</option>
//           </select>
//           <Button icon={Plus} onClick={onAddMember}>
//             Add Member
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredMembers.map((member) => (
//           <Card
//             key={member.id}
//             hover
//             onClick={() => onSelectMember(member)}
//             className="cursor-pointer"
//           >
//             <div className="space-y-4">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
//                     <User size={24} className="text-gray-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{member.name}</h3>
//                     <p className="text-sm text-gray-600">{member.department}</p>
//                   </div>
//                 </div>
//                 <Badge variant={member.status === 'active' ? 'success' : 'default'} size="xs">
//                   {member.status}
//                 </Badge>
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Mail size={16} />
//                   <span>{member.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Phone size={16} />
//                   <span>{member.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Shield size={16} className="text-gray-600" />
//                   <Badge variant={getRoleColor(member.role)} size="sm">
//                     {member.role}
//                   </Badge>
//                 </div>
//               </div>

//               {member.permissions && (
//                 <div className="pt-3 border-t">
//                   <p className="text-xs text-gray-500 mb-2">Permissions</p>
//                   <div className="flex flex-wrap gap-1">
//                     {member.permissions.map((permission, index) => (
//                       <span
//                         key={index}
//                         className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
//                       >
//                         {permission}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeamList;
