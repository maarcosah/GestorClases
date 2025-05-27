import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Material } from '../types';

interface ReservationFormProps {
  material: Material;
  onReservar: (materialId: number, fecha: string, horaInicio: string, horaFin: string, cantidad: number) => void;
  onCancel: () => void;
  onShowNotification: (tipo: 'success' | 'error', mensaje: string) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  material,
  onReservar,
  onCancel,
  onShowNotification
}) => {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const handleSubmit = () => {
    if (fecha && horaInicio && horaFin) {
      onReservar(material.id, fecha, horaInicio, horaFin, cantidad);
    } else {
      onShowNotification('error', 'Por favor completa todos los campos');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Reservar {material.nombre}</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Math.min(material.cantidad - material.reservado, parseInt(e.target.value) || 1)))}
              min="1"
              max={material.cantidad - material.reservado}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Disponible: {material.cantidad - material.reservado}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirmar Reserva
            </button>
            
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;