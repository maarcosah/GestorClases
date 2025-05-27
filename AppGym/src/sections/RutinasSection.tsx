import React from 'react';
import { Clock } from 'lucide-react';
import type { Rutina } from '../types';

interface RutinasSectionProps {
  rutinas: Rutina[];
}

const RutinasSection: React.FC<RutinasSectionProps> = ({ rutinas }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rutinas Predefinidas</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {rutinas.map(rutina => (
          <div key={rutina.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-900">{rutina.nombre}</h3>
              <div className="flex gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rutina.tipo === 'fuerza' ? 'bg-blue-100 text-blue-800' :
                  rutina.tipo === 'cardio' ? 'bg-red-100 text-red-800' :
                  rutina.tipo === 'flexibilidad' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {rutina.tipo.charAt(0).toUpperCase() + rutina.tipo.slice(1)}
                </span>
                
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rutina.nivel === 'principiante' ? 'bg-green-100 text-green-800' :
                  rutina.nivel === 'intermedio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {rutina.nivel.charAt(0).toUpperCase() + rutina.nivel.slice(1)}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3">{rutina.descripcion}</p>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock size={16} className="mr-2" />
              Duración: {rutina.duracion} minutos
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Ejercicios:</h4>
              <ul className="space-y-1">
                {rutina.ejercicios.map((ejercicio, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {ejercicio}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RutinasSection;