import React from 'react';
import { Calendar, Dumbbell, Users } from 'lucide-react';

type Tab = 'clases' | 'rutinas' | 'material';

interface NavigationProps {
  pestanaActiva: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ pestanaActiva, onTabChange }) => {
  const tabs = [
    { id: 'clases' as Tab, label: 'Clases', icon: Calendar },
    { id: 'rutinas' as Tab, label: 'Rutinas', icon: Dumbbell },
    { id: 'material' as Tab, label: 'Material', icon: Users }
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                pestanaActiva === id
                  ? 'border-blue-500 text-black-600'
                  : 'border-transparent text-black-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon size={20} className="mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;