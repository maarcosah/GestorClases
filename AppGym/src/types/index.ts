// Tipos TypeScript
export interface Clase {
  id: number;
  nombre: string;
  instructor: string;
  fecha: string;
  hora: string;
  duracion: number;
  capacidadMaxima: number;
  participantesInscritos: string[];
  descripcion: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
}

export interface Rutina {
  id: number;
  nombre: string;
  tipo: 'fuerza' | 'cardio' | 'flexibilidad' | 'funcional';
  duracion: number;
  ejercicios: string[];
  descripcion: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
}

export interface Material {
  id: number;
  nombre: string;
  cantidad: number;
  reservado: number;
  descripcion: string;
  imagen: string;
}

export interface Reserva {
  id: number;
  materialId: number;
  usuario: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  cantidad: number;
}

export interface Notification {
  tipo: 'success' | 'error';
  mensaje: string;
}