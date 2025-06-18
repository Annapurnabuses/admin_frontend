import React from "react";
import {
  Home,
  Bus,
  Users,
  CreditCard,
  Receipt,
  UserPlus,
  FileText,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Building,
  Settings,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { sidebarOpen } = useApp();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bookings", label: "Bookings", icon: FileText },
    { id: "vehicles", label: "Vehicles", icon: Bus },
    { id: "consumers", label: "Consumers", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    // { id: 'expenses', label: 'Expenses (not given in first phase)', icon: Receipt },
    // { id: 'vendors', label: 'Vendors (not given in first phase)', icon: Building },
    { id: "team", label: "Team", icon: UserPlus },
    { id: "rates", label: "Rate Cards", icon: DollarSign },
    // { id: 'chat', label: 'Chat Support (not given in first phase)', icon: MessageSquare },
    { id: "documents", label: "Documents", icon: FileText },
    // { id: 'reports', label: 'Reports (not given in first phase)', icon: TrendingUp },
  ];

  return (
    <aside
      className={`
      fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200
      transition-all duration-300 z-30
      ${sidebarOpen ? "w-64" : "w-16"}
    `}
    >
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                transition-colors group relative
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
              {!sidebarOpen && (
                <div
                  className="
                  absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white 
                  text-sm rounded opacity-0 group-hover:opacity-100 
                  pointer-events-none transition-opacity whitespace-nowrap
                "
                >
                  {item.label}
                </div>
              )}
              {isActive && sidebarOpen && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l"></div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
