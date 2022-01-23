import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';
import { ListSpecialtiesUseCase } from './list-specialties.usecase';

const specialties: Specialty[] = [
  new Specialty('specialty1'),
  new Specialty('specialty2'),
  new Specialty('specialty3'),
];

describe('List specialties usecase', () => {
  let listSpecialtiesUseCase: ListSpecialtiesUseCase;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListSpecialtiesUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            find: jest.fn().mockResolvedValue(specialties),
          },
        },
      ],
    }).compile();

    listSpecialtiesUseCase = module.get<ListSpecialtiesUseCase>(
      ListSpecialtiesUseCase,
    );

    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(listSpecialtiesUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a specialties list successfuly', async () => {
      const result = await listSpecialtiesUseCase.execute();

      expect(result).toEqual(specialties);
    });
  });
});
