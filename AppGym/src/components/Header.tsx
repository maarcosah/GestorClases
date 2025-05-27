import React from 'react';
import { Dumbbell, User } from 'lucide-react';

interface HeaderProps {
  usuario: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ usuario, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Dumbbell className="text-blue-600 mr-3" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">FitManager</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-700">
              <User size={20} className="mr-2" />
              <span className="font-medium">{usuario}</span>
            </div>
            
            <button
              onClick={onLogout}
              style={{padding: '10px'}}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;