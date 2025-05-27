import React from 'react';
import { Calendar, Clock, Users, User, Plus, Minus } from 'lucide-react';
import type { Clase } from '../types';

interface ClasesSectionProps {
  clases: Clase[];
  usuario: string;
  onInscribirse: (claseId: number) => void;
  onDesinscribirse: (claseId: number) => void;
}

const ClasesSection: React.FC<ClasesSectionProps> = ({
  clases,
  usuario,
  onInscribirse,
  onDesinscribirse
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Clases Disponibles</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clases.map(clase => {
          const estaInscrito = clase.participantesInscritos.includes(usuario);
          const estaCompleta = clase.participantesInscritos.length >= clase.capacidadMaxima;
          
          return (
            <div key={clase.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900">{clase.nombre}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  clase.nivel === 'principiante' ? 'bg-green-100 text-green-800' :
                  clase.nivel === 'intermedio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {clase.nivel.charAt(0).toUpperCase() + clase.nivel.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">{clase.descripcion}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  Instructor: {clase.instructor}
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {new Date(clase.fecha).toLocaleDateString('es-ES')}
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {clase.hora} - {clase.duracion} min
                </div>
                
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  {clase.participantesInscritos.length}/{clase.capacidadMaxima} participantes
                </div>
              </div>
              
              <div className="flex gap-2">
                {estaInscrito ? (
                  <button
                    onClick={() => onDesinscribirse(clase.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Minus size={16} className="mr-2" />
                    Desinscribirse
                  </button>
                ) : (
                  <button
                    onClick={() => onInscribirse(clase.id)}
                    disabled={estaCompleta}
                    className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                      estaCompleta
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Plus size={16} className="mr-2" />
                    {estaCompleta ? 'Completa' : 'Inscribirse'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClasesSection;