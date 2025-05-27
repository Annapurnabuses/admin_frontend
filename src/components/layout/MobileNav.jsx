import React from 'react';
import { Home, Bus, Users, CreditCard, Menu } from 'lucide-react';

const MobileNav = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Bus },
    { id: 'consumers', label: 'Customers', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'more', label: 'More', icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'more') {
                  // Handle more menu
                } else {
                  setCurrentPage(item.id);
                }
              }}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg
                ${isActive ? 'text-blue-600' : 'text-gray-600'}
              `}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;