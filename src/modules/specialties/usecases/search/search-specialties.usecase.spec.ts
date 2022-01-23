import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';
import { SearchSpecialtiesUseCase } from './search-specialties.usecase';

const specialties: Specialty[] = [
  new Specialty('specialty1'),
  new Specialty('specialty2'),
  new Specialty('specialty3'),
];

describe('Search specialties usecase', () => {
  let searchSpecialtiesUseCase: SearchSpecialtiesUseCase;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchSpecialtiesUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            find: jest.fn().mockResolvedValue(specialties),
          },
        },
      ],
    }).compile();

    searchSpecialtiesUseCase = module.get<SearchSpecialtiesUseCase>(
      SearchSpecialtiesUseCase,
    );

    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(SearchSpecialtiesUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('execute', () => {
    it('should return a searched specialty', async () => {
      const result = await searchSpecialtiesUseCase.execute({
        description: 'query',
      });

      expect(result).toEqual(specialties);
    });
  });
});
