import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';
import { ListSpecialtiesUseCase } from './list-specialties.usecase';

const specialties: Specialty[] = [
  new Specialty('specialty1'),
  new Specialty('specialty2'),
  new Specialty('specialty3'),
];

describe('List specialties usecase', () => {
  let listSpecialtiesUseCase: ListSpecialtiesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListSpecialtiesUseCase,
        {
          provide: SpecialtiesRepository,
          useValue: {
            GetAll: jest.fn().mockResolvedValue(specialties),
          },
        },
      ],
    }).compile();

    listSpecialtiesUseCase = module.get<ListSpecialtiesUseCase>(
      ListSpecialtiesUseCase,
    );
  });

  it('should be defined', () => {
    expect(listSpecialtiesUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a specialties list successfuly', async () => {
      const result = await listSpecialtiesUseCase.execute();

      expect(result).toEqual(specialties);
    });
  });
});
