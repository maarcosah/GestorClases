import React from 'react';
import type { Material, Reserva } from '../types';

interface MaterialSectionProps {
  materiales: Material[];
  reservas: Reserva[];
  usuario: string;
  onReservar: (material: Material) => void;
  onCancelarReserva: (reservaId: number) => void;
}

const MaterialSection: React.FC<MaterialSectionProps> = ({
  materiales,
  reservas,
  usuario,
  onReservar,
  onCancelarReserva
}) => {
  const misReservas = reservas.filter(r => r.usuario === usuario);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Material del Gimnasio</h2>
      
      {/* Material disponible */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {materiales.map(material => (
          <div key={material.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{material.imagen}</div>
              <h3 className="text-lg font-bold text-gray-900">{material.nombre}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{material.descripcion}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">{material.cantidad}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reservado:</span>
                <span className="font-medium text-red-600">{material.reservado}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Disponible:</span>
                <span className="font-medium text-green-600">{material.cantidad - material.reservado}</span>
              </div>
            </div>
            
            <button
              onClick={() => onReservar(material)}
              disabled={material.cantidad - material.reservado === 0}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                material.cantidad - material.reservado === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {material.cantidad - material.reservado === 0 ? 'No Disponible' : 'Reservar'}
            </button>
          </div>
        ))}
      </div>

      {/* Mis reservas */}
      {misReservas.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Reservas</h3>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {misReservas.map(reserva => {
                    return (
                      <tr key={reserva.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reserva.cantidad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => onCancelarReserva(reserva.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialSection;