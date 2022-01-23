import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../entities/specialty.entity';
import { ListSpecialtiesController } from './list-specialties.controller';
import { ListSpecialtiesUseCase } from './list-specialties.usecase';

const specialties: Specialty[] = [
  {
    id: '1',
    description: 'specialty1',
    createdAt: new Date(),
    deletedAt: null,
  },
  {
    id: '2',
    description: 'specialty2',
    createdAt: new Date(),
    deletedAt: null,
  },
  {
    id: '3',
    description: 'specialty3',
    createdAt: new Date(),
    deletedAt: null,
  },
];

describe('List specialties controller', () => {
  let listSpecialtiesController: ListSpecialtiesController;
  let listSpecialtiesUseCase: ListSpecialtiesUseCase;

  beforeEach(async () => {
    const modules: TestingModule = await Test.createTestingModule({
      controllers: [ListSpecialtiesController],
      providers: [
        {
          provide: ListSpecialtiesUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(specialties),
          },
        },
      ],
    }).compile();

    listSpecialtiesController = modules.get<ListSpecialtiesController>(
      ListSpecialtiesController,
    );
    listSpecialtiesUseCase = modules.get<ListSpecialtiesUseCase>(
      ListSpecialtiesUseCase,
    );
  });

  it('should be defined', () => {
    expect(listSpecialtiesController).toBeDefined();
    expect(listSpecialtiesUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return specialties', async () => {
      const result = await listSpecialtiesController.handle();

      expect(result).toEqual(specialties);
    });
  });
});
