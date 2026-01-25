import { Car } from '../models/car.model';

export const MOCK_CARS: Car[] = [
  {
    id: 1,
    brand: 'Volkswagen',
    model: 'Jetta',
    year: 2013,
    km: 75000,
    price: 55000,
    description: 'Jetta 2.0 de leilão(recuperado de financiamento). ipva e licenciamento 2026, manual e chave reserva, perfeito estado, oportunidade única.',
    image: '/assets/cars/jetta.jpeg',
    ownerId: 'mock-user-uid',
    ownerName: 'User Default',
    ownerPhoto: '/assets/avatar-default/avatar-default.jpg',
    ownerPhone: '5511999999999'
  },

  {
    id: 2,
    brand: 'Mitsubish',
    model: 'Lancer',
    year: 2015,
    km: 60000,
    price: 140000,
    description: 'Lancer com modificações na estética, com motor remapeado e escapamento esportivo.',
    image: '/assets/cars/lancer.jpg',
    ownerId: 'mock-user-uid',
    ownerName: 'User Default',
    ownerPhoto: '/assets/avatar-default/avatar-default.jpg',
    ownerPhone: '5511999999999'
  },
  
  {
    id: 3,
    brand: 'BMW',
    model: 'M2',
    year: 2024,
    km: 30000,
    price: 600000,
    description: 'BMW M2 (G87) 2024/2025. O puro prazer de dirigir com 460 cv, tração traseira e o icônico motor S58. Uma máquina de performance inigualável.',
    image: '/assets/cars/m2.webp',
    ownerId: 'mock-user-uid',
    ownerName: 'User Default',
    ownerPhoto: '/assets/avatar-default/avatar-default.jpg',
    ownerPhone: '5511999999999'
  }

];
