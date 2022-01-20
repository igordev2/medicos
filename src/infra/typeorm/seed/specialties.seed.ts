import { randomUUID } from 'crypto';

export const SpecialtiesSeed = [
  {
    id: randomUUID(),
    description: 'Alergologia',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Angiologia',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Buco maxilo',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Cardiologia clínca',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Cardiologia infantil',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Cirurgia cabeça e pescoço',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Cirurgia cardíaca',
    created_at: `${new Date()}`,
  },
  {
    id: randomUUID(),
    description: 'Cirurgia de tórax',
    created_at: `${new Date()}`,
  },
];
