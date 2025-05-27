import type { Clase, Rutina, Material } from '../types';

export const clasesIniciales: Clase[] = [
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
];

export const rutinasIniciales: Rutina[] = [
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
];

export const materialesIniciales: Material[] = [
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
];