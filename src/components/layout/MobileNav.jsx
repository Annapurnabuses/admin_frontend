import React, {useState} from 'react';
import { DollarSign, MessageSquare, FileText, TrendingUp,UserPlus, Building, Receipt, Home, Bus, Users, CreditCard, Menu } from 'lucide-react';

const MobileNav = ({ currentPage, setCurrentPage }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Bus },
    { id: 'consumers', label: 'Customers', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'more', label: 'More', icon: Menu },
  ];

  const moreMenuItems = [
    { id: 'vehicles', label: 'Vehicles', icon: Bus },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'vendors', label: 'Vendors', icon: Building },
    { id: 'team', label: 'Team', icon: UserPlus },
    { id: 'rates', label: 'Rate Cards', icon: DollarSign },
    { id: 'chat', label: 'Chat Support', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ];

  return (
    <>
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
                    setShowMoreMenu(!showMoreMenu);
                  } else {
                    setCurrentPage(item.id);
                    setShowMoreMenu(false);
                  }
                }}
                className={`
                  flex flex-col items-center space-y-1 px-3 py-2 rounded-lg
                  ${isActive || (item.id === 'more' && showMoreMenu) ? 'text-blue-600' : 'text-gray-600'}
                `}
              >
                <Icon size={20} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* More Menu Overlay */}
      {showMoreMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMoreMenu(false)}
          />
          
          {/* Menu */}
          <div className="fixed bottom-16 left-0 right-0 bg-white border border-gray-200 rounded-t-xl shadow-lg z-50">
            <div className="grid grid-cols-3 gap-4 p-4">
              {moreMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setShowMoreMenu(false);
                    }}
                    className={`
                      flex flex-col items-center space-y-2 p-3 rounded-lg
                      ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <Icon size={24} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNav;