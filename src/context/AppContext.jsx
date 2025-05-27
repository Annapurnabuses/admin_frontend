import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', message: '3 payments pending approval', time: '5 min ago' },
    { id: 2, type: 'booking', message: 'New booking request received', time: '10 min ago' },
    { id: 3, type: 'vehicle', message: 'Vehicle insurance expiring soon', time: '1 hour ago' }
  ]);

  const addNotification = (notification) => {
    setNotifications(prev => [{
      id: Date.now(),
      time: 'Just now',
      ...notification
    }, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      setSidebarOpen,
      notifications,
      setNotifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};