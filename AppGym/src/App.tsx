import React, { useState } from 'react';
import { Calendar, Clock, Users, Dumbbell, User, Plus, Minus, X, CheckCircle, AlertCircle } from 'lucide-react';
import type { Clase, Rutina, Material, Reserva} from './types'


const GymClassManager: React.FC = () => {
  // Estados principales
  const [usuario, setUsuario] = useState<string>('');
  const [mostrarLogin, setMostrarLogin] = useState<boolean>(true);
  const [pestanaActiva, setPestanaActiva] = useState<'clases' | 'rutinas' | 'material'>('clases');
  const [notification, setNotification] = useState<{tipo: 'success' | 'error', mensaje: string} | null>(null);

  // Estados para clases
  const [clases, setClases] = useState<Clase[]>([
    {
      id: 1,
      nombre: 'Yoga Matutino',
      instructor: 'Ana García',
      fecha: '2025-05-27',
      hora: '08:00',
      duracion: 60,
      capacidadMaxima: 15,
      participantesInscritos: ['María López', 'Carlos Ruiz'],
      descripcion: 'Clase de yoga para empezar el día con energía y relajación',
      nivel: 'principiante'
    },
    {
      id: 2,
      nombre: 'CrossFit Intensivo',
      instructor: 'Miguel Santos',
      fecha: '2025-05-27',
      hora: '18:00',
      duracion: 45,
      capacidadMaxima: 12,
      participantesInscritos: ['Pedro Martín'],
      descripcion: 'Entrenamiento funcional de alta intensidad',
      nivel: 'avanzado'
    },
    {
      id: 3,
      nombre: 'Pilates',
      instructor: 'Laura Fernández',
      fecha: '2025-05-28',
      hora: '10:00',
      duracion: 50,
      capacidadMaxima: 10,
      participantesInscritos: [],
      descripcion: 'Fortalecimiento del core y mejora de la postura',
      nivel: 'intermedio'
    },
    {
      id: 4,
      nombre: 'Spinning',
      instructor: 'Javier Moreno',
      fecha: '2025-05-28',
      hora: '19:30',
      duracion: 45,
      capacidadMaxima: 20,
      participantesInscritos: ['Ana Jiménez', 'Roberto Silva', 'Carmen Vega'],
      descripcion: 'Ciclismo indoor con música motivacional',
      nivel: 'intermedio'
    }
  ]);

  // Estados para rutinas
  const [rutinas] = useState<Rutina[]>([
    {
      id: 1,
      nombre: 'Rutina Principiante - Fuerza',
      tipo: 'fuerza',
      duracion: 45,
      ejercicios: [
        'Sentadillas con peso corporal - 3x12',
        'Flexiones de rodillas - 3x8',
        'Plancha - 3x30seg',
        'Peso muerto con mancuernas - 3x10',
        'Press de hombros - 3x12'
      ],
      descripcion: 'Rutina básica para desarrollar fuerza general',
      nivel: 'principiante'
    },
    {
      id: 2,
      nombre: 'Cardio HIIT',
      tipo: 'cardio',
      duracion: 30,
      ejercicios: [
        'Burpees - 4x30seg',
        'Mountain climbers - 4x30seg',
        'Jumping jacks - 4x30seg',
        'Sprints en el sitio - 4x30seg',
        'Descanso activo - 30seg entre ejercicios'
      ],
      descripcion: 'Entrenamiento cardiovascular de alta intensidad',
      nivel: 'intermedio'
    },
    {
      id: 3,
      nombre: 'Flexibilidad Total',
      tipo: 'flexibilidad',
      duracion: 25,
      ejercicios: [
        'Estiramiento de isquiotibiales - 2min',
        'Apertura de cadera - 2min',
        'Estiramiento de cuádriceps - 2min',
        'Torsión espinal - 2min cada lado',
        'Estiramiento de hombros - 2min'
      ],
      descripcion: 'Rutina completa de estiramientos y movilidad',
      nivel: 'principiante'
    },
    {
      id: 4,
      nombre: 'Funcional Avanzado',
      tipo: 'funcional',
      duracion: 60,
      ejercicios: [
        'Turkish get-ups - 3x5 cada lado',
        'Thrusters - 4x8',
        'Remo con kettlebell - 4x12',
        'Saltos pliométricos - 3x10',
        'Carries con peso - 3x50m'
      ],
      descripcion: 'Movimientos funcionales para atletas avanzados',
      nivel: 'avanzado'
    }
  ]);

  // Estados para material
  const [materiales, setMateriales] = useState<Material[]>([
    {
      id: 1,
      nombre: 'Mancuernas Ajustables',
      cantidad: 10,
      reservado: 2,
      descripcion: 'Mancuernas de 5-25kg ajustables',
      imagen: '🏋️'
    },
    {
      id: 2,
      nombre: 'Kettlebells',
      cantidad: 8,
      reservado: 1,
      descripcion: 'Kettlebells de diferentes pesos (8kg-24kg)',
      imagen: '⚖️'
    },
    {
      id: 3,
      nombre: 'Colchonetas de Yoga',
      cantidad: 20,
      reservado: 5,
      descripcion: 'Colchonetas antideslizantes para yoga y pilates',
      imagen: '🧘'
    },
    {
      id: 4,
      nombre: 'Bandas Elásticas',
      cantidad: 15,
      reservado: 3,
      descripcion: 'Bandas de resistencia de diferentes tensiones',
      imagen: '🎗️'
    },
    {
      id: 5,
      nombre: 'Balones Medicinales',
      cantidad: 6,
      reservado: 0,
      descripcion: 'Balones de 3kg, 5kg y 8kg',
      imagen: '⚽'
    }
  ]);

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [mostrarFormularioReserva, setMostrarFormularioReserva] = useState<boolean>(false);
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Material | null>(null);

  // Función para mostrar notificaciones
  const mostrarNotificacion = (tipo: 'success' | 'error', mensaje: string) => {
    setNotification({ tipo, mensaje });
    setTimeout(() => setNotification(null), 3000);
  };

  // Funciones para manejar clases
  const inscribirseClase = (claseId: number) => {
    if (!usuario) return;
    
    setClases(prev => prev.map(clase => {
      if (clase.id === claseId) {
        if (clase.participantesInscritos.includes(usuario)) {
          mostrarNotificacion('error', 'Ya estás inscrito en esta clase');
          return clase;
        }
        if (clase.participantesInscritos.length >= clase.capacidadMaxima) {
          mostrarNotificacion('error', 'Clase completa');
          return clase;
        }
        mostrarNotificacion('success', `Te has inscrito a ${clase.nombre}`);
        return {
          ...clase,
          participantesInscritos: [...clase.participantesInscritos, usuario]
        };
      }
      return clase;
    }));
  };

  const desinscribirseClase = (claseId: number) => {
    if (!usuario) return;
    
    setClases(prev => prev.map(clase => {
      if (clase.id === claseId) {
        if (!clase.participantesInscritos.includes(usuario)) {
          mostrarNotificacion('error', 'No estás inscrito en esta clase');
          return clase;
        }
        mostrarNotificacion('success', `Te has desinscrito de ${clase.nombre}`);
        return {
          ...clase,
          participantesInscritos: clase.participantesInscritos.filter(p => p !== usuario)
        };
      }
      return clase;
    }));
  };

  // Funciones para manejar reservas de material
  const reservarMaterial = (materialId: number, fecha: string, horaInicio: string, horaFin: string, cantidad: number) => {
    const material = materiales.find(m => m.id === materialId);
    if (!material) return;

    if (material.cantidad - material.reservado < cantidad) {
      mostrarNotificacion('error', 'No hay suficiente material disponible');
      return;
    }

    const nuevaReserva: Reserva = {
      id: Date.now(),
      materialId,
      usuario,
      fecha,
      horaInicio,
      horaFin,
      cantidad
    };

    setReservas(prev => [...prev, nuevaReserva]);
    setMateriales(prev => prev.map(m => 
      m.id === materialId 
        ? { ...m, reservado: m.reservado + cantidad }
        : m
    ));

    mostrarNotificacion('success', `Has reservado ${cantidad} ${material.nombre}`);
    setMostrarFormularioReserva(false);
    setMaterialSeleccionado(null);
  };

  const cancelarReserva = (reservaId: number) => {
    const reserva = reservas.find(r => r.id === reservaId);
    if (!reserva) return;

    setReservas(prev => prev.filter(r => r.id !== reservaId));
    setMateriales(prev => prev.map(m => 
      m.id === reserva.materialId 
        ? { ...m, reservado: m.reservado - reserva.cantidad }
        : m
    ));

    mostrarNotificacion('success', 'Reserva cancelada');
  };

  // Componente de Login
  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Dumbbell className="mx-auto mb-4 text-blue-600" size={48} />
          <h1 className="text-3xl font-bold text-gray-800">FitManager</h1>
          <p className="text-gray-600 mt-2">Gestor de Clases de Gimnasio</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
            />
          </div>
          
          <button
            onClick={() => {
              if (usuario.trim()) {
                setMostrarLogin(false);
                mostrarNotificacion('success', `¡Bienvenido ${usuario}!`);
              } else {
                mostrarNotificacion('error', 'Por favor ingresa tu nombre');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );

  // Componente de Formulario de Reserva
  const FormularioReserva = () => {
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [cantidad, setCantidad] = useState(1);

    if (!materialSeleccionado) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Reservar {materialSeleccionado.nombre}</h3>
            <button
              onClick={() => {
                setMostrarFormularioReserva(false);
                setMaterialSeleccionado(null);
              }}
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
                onChange={(e) => setCantidad(Math.max(1, Math.min(materialSeleccionado.cantidad - materialSeleccionado.reservado, parseInt(e.target.value) || 1)))}
                min="1"
                max={materialSeleccionado.cantidad - materialSeleccionado.reservado}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Disponible: {materialSeleccionado.cantidad - materialSeleccionado.reservado}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (fecha && horaInicio && horaFin) {
                    reservarMaterial(materialSeleccionado.id, fecha, horaInicio, horaFin, cantidad);
                  } else {
                    mostrarNotificacion('error', 'Por favor completa todos los campos');
                  }
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirmar Reserva
              </button>
              
              <button
                onClick={() => {
                  setMostrarFormularioReserva(false);
                  setMaterialSeleccionado(null);
                }}
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

  // Componente principal de la aplicación
  if (mostrarLogin) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notificaciones */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          notification.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white flex items-center gap-2`}>
          {notification.tipo === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {notification.mensaje}
        </div>
      )}

      {/* Header */}
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
                onClick={() => {
                  setMostrarLogin(true);
                  setUsuario('');
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación por pestañas */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'clases', label: 'Clases', icon: Calendar },
              { id: 'rutinas', label: 'Rutinas', icon: Dumbbell },
              { id: 'material', label: 'Material', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPestanaActiva(id as any)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                  pestanaActiva === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={20} className="mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pestanaActiva === 'clases' && (
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
                          onClick={() => desinscribirseClase(clase.id)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                        >
                          <Minus size={16} className="mr-2" />
                          Desinscribirse
                        </button>
                      ) : (
                        <button
                          onClick={() => inscribirseClase(clase.id)}
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
        )}

        {pestanaActiva === 'rutinas' && (
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
        )}

        {pestanaActiva === 'material' && (
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
                    onClick={() => {
                      setMaterialSeleccionado(material);
                      setMostrarFormularioReserva(true);
                    }}
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
            {reservas.filter(r => r.usuario === usuario).length > 0 && (
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
                        {reservas
                          .filter(r => r.usuario === usuario)
                          .map(reserva => {
                            const material = materiales.find(m => m.id === reserva.materialId);
                            return (
                              <tr key={reserva.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <div className="flex items-center">
                                    <span className="text-2xl mr-3">{material?.imagen}</span>
                                    {material?.nombre}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(reserva.fecha).toLocaleDateString('es-ES')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {reserva.horaInicio} - {reserva.horaFin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {reserva.cantidad}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => cancelarReserva(reserva.id)}
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
        )}
      </main>

      {/* Formulario de reserva modal */}
      {mostrarFormularioReserva && <FormularioReserva />}
    </div>
  );
};

export default GymClassManager;