import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface LoginFormProps {
  usuario: string;
  onLogin: (usuario: string) => void;
  onShowNotification: (tipo: 'success' | 'error', mensaje: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ usuario, onLogin, onShowNotification }) => {
  const [inputValue, setInputValue] = useState(usuario);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onLogin(inputValue.trim());
      onShowNotification('success', `¡Bienvenido ${inputValue.trim()}!`);
    } else {
      onShowNotification('error', 'Por favor ingresa tu nombre');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Dumbbell className="mx-auto mb-4 text-blue-600" size={48} />
          <h1 className="text-3xl font-bold text-gray-800">FitManager</h1>
          <p className="text-gray-600 mt-2">Gestor de Clases de Gimnasio</p>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;