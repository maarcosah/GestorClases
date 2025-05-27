import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationProps {
  notification: Notification;
}

const NotificationComponent: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
      notification.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white flex items-center gap-2`}>
      {notification.tipo === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      {notification.mensaje}
    </div>
  );
};

export default NotificationComponent;