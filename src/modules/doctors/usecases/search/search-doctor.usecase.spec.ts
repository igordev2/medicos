import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { SearchDoctorUseCase } from './search-doctor.usecase';

const doctors: Doctor[] = [
  new Doctor({ name: 'igor', crm: 123, landline: 456, cellPhone: 789 }),
  new Doctor({ name: 'igor2', crm: 1233, landline: 4564, cellPhone: 7890 }),
];

describe('Search doctor usecase', () => {
  let searchDoctorUseCase: SearchDoctorUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchDoctorUseCase,
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            find: jest.fn().mockResolvedValue(doctors),
          },
        },
      ],
    }).compile();

    searchDoctorUseCase = module.get<SearchDoctorUseCase>(SearchDoctorUseCase);
  });

  it('should be defined', () => {
    expect(searchDoctorUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a searched doctor', async () => {
      const result = await searchDoctorUseCase.execute({
        description: 'query',
      });

      expect(result).toEqual(doctors);
    });
  });
});
