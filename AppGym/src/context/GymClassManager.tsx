import React, { useState } from 'react';
import type { Clase, Rutina, Material, Reserva, Notification } from '../types';
import { clasesIniciales, rutinasIniciales, materialesIniciales } from '../data/data';
import LoginForm from '../components/LoginForm';
import NotificationComponent from '../components/Notification';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ClasesSection from '../sections/ClasesSection';
import RutinasSection from '../sections/RutinasSection';
import MaterialSection from '../sections/MaterialSection';
import ReservationForm from '../forms/ReservationForm';

type Tab = 'clases' | 'rutinas' | 'material';

const GymClassManager: React.FC = () => {
  // Estados principales
  const [usuario, setUsuario] = useState<string>('');
  const [mostrarLogin, setMostrarLogin] = useState<boolean>(true);
  const [pestanaActiva, setPestanaActiva] = useState<Tab>('clases');
  const [notification, setNotification] = useState<Notification | null>(null);

  // Estados para datos
  const [clases, setClases] = useState<Clase[]>(clasesIniciales);
  const [rutinas] = useState<Rutina[]>(rutinasIniciales);
  const [materiales, setMateriales] = useState<Material[]>(materialesIniciales);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  // Estados para UI
  const [mostrarFormularioReserva, setMostrarFormularioReserva] = useState<boolean>(false);
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Material | null>(null);

  // Función para mostrar notificaciones
  const mostrarNotificacion = (tipo: 'success' | 'error', mensaje: string) => {
    setNotification({ tipo, mensaje });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handlers para login
  const handleLogin = (nombreUsuario: string) => {
    setUsuario(nombreUsuario);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    setMostrarLogin(true);
    setUsuario('');
  };

  // Handlers para clases
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
          participantesInscritos: clase.participantesInscritos.filter((p: string) => p !== usuario)
        };
      }
      return clase;
    }));
  };

  // Handlers para material
  const abrirFormularioReserva = (material: Material) => {
    setMaterialSeleccionado(material);
    setMostrarFormularioReserva(true);
  };

  const cerrarFormularioReserva = () => {
    setMostrarFormularioReserva(false);
    setMaterialSeleccionado(null);
  };

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
    cerrarFormularioReserva();
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

  // Render del componente principal
  if (mostrarLogin) {
    return (
      <LoginForm
        usuario={usuario}
        onLogin={handleLogin}
        onShowNotification={mostrarNotificacion}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notificaciones */}
      {notification && <NotificationComponent notification={notification} />}

      {/* Header */}
      <Header usuario={usuario} onLogout={handleLogout} />

      {/* Navegación */}
      <Navigation pestanaActiva={pestanaActiva} onTabChange={setPestanaActiva} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pestanaActiva === 'clases' && (
          <ClasesSection
            clases={clases}
            usuario={usuario}
            onInscribirse={inscribirseClase}
            onDesinscribirse={desinscribirseClase}
          />
        )}

        {pestanaActiva === 'rutinas' && (
          <RutinasSection rutinas={rutinas} />
        )}

        {pestanaActiva === 'material' && (
          <MaterialSection
            materiales={materiales}
            reservas={reservas}
            usuario={usuario}
            onReservar={abrirFormularioReserva}
            onCancelarReserva={cancelarReserva}
          />
        )}
      </main>

      {/* Formulario de reserva modal */}
      {mostrarFormularioReserva && materialSeleccionado && (
        <ReservationForm
          material={materialSeleccionado}
          onReservar={reservarMaterial}
          onCancel={cerrarFormularioReserva}
          onShowNotification={mostrarNotificacion}
        />
      )}
    </div>
  );
};

export default GymClassManager;