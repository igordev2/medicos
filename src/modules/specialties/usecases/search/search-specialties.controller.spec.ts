import { Test, TestingModule } from '@nestjs/testing';
import { QuerySpecialtiesDto } from '../../dtos/query-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { SearchSpecialtiesController } from './search-specialties.controller';
import { SearchSpecialtiesUseCase } from './search-specialties.usecase';

const specialtiesSearch: Specialty[] = [
  {
    id: '1',
    description: 'specialty1',
    createdAt: new Date(),
    deletedAt: null,
  },
];

describe('Search specialties controller', () => {
  let searchSpecialtiesController: SearchSpecialtiesController;
  let searchSpecialtiesUseCase: SearchSpecialtiesUseCase;

  beforeEach(async () => {
    const modules: TestingModule = await Test.createTestingModule({
      controllers: [SearchSpecialtiesController],
      providers: [
        {
          provide: SearchSpecialtiesUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(specialtiesSearch),
          },
        },
      ],
    }).compile();

    searchSpecialtiesController = modules.get<SearchSpecialtiesController>(
      SearchSpecialtiesController,
    );
    searchSpecialtiesUseCase = modules.get<SearchSpecialtiesUseCase>(
      SearchSpecialtiesUseCase,
    );
  });

  it('should be defined', () => {
    expect(searchSpecialtiesController).toBeDefined();
    expect(searchSpecialtiesUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return a searched specialty', async () => {
      const query: QuerySpecialtiesDto = {
        description: 'specialty1',
      };

      const result = await searchSpecialtiesController.handle(query);

      expect(result).toEqual(specialtiesSearch);
    });
  });
});
