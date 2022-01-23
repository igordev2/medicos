import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';
import { SearchSpecialtiesUseCase } from './search-specialties.usecase';

const specialties: Specialty[] = [
  new Specialty('specialty1'),
  new Specialty('specialty2'),
  new Specialty('specialty3'),
];

describe('List specialties', () => {
  let searchSpecialtiesUseCase: SearchSpecialtiesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchSpecialtiesUseCase,
        {
          provide: SpecialtiesRepository,
          useValue: {
            find: jest.fn().mockResolvedValue(specialties),
          },
        },
      ],
    }).compile();

    searchSpecialtiesUseCase = module.get<SearchSpecialtiesUseCase>(
      SearchSpecialtiesUseCase,
    );
  });

  it('should be defined', () => {
    expect(SearchSpecialtiesUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a specialties list successfuly', async () => {
      const result = await searchSpecialtiesUseCase.execute({
        description: 'query',
      });

      expect(result).toEqual(specialties);
    });
  });
});
