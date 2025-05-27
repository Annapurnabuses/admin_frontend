import { useApp } from '../context/AppContext';

export const useNotifications = () => {
  const { notifications, addNotification, removeNotification } = useApp();

  return {
    notifications,
    addNotification,
    removeNotification,
    notificationCount: notifications.length
  };
};