import { Test, TestingModule } from '@nestjs/testing';
import { Doctor } from '../../entities/doctor.entity';
import { SearchDoctorController } from './search-doctor.controller';
import { SearchDoctorUseCase } from './search-doctor.usecase';

const doctorSearch: Doctor[] = [
  {
    id: '1',
    name: 'Igor',
    crm: 123,
    landline: 99,
    cellPhone: 888,
    address: {
      id: '1',
      zipCode: '123',
      neighborhood: 'teste',
      streetAddress: 'teste street',
      locality: 'Disney',
      uf: 'sp',
      createdAt: new Date(),
      deletedAt: null,
    },
    specialties: [
      {
        id: '1',
        description: 'Teste',
        createdAt: new Date(),
        deletedAt: null,
      },
    ],
    createdAt: new Date(),
    deletedAt: null,
  },
];

describe('Search specialties controller', () => {
  let searchDoctorsController: SearchDoctorController;
  let searchDoctorsUseCase: SearchDoctorUseCase;

  beforeEach(async () => {
    const modules: TestingModule = await Test.createTestingModule({
      controllers: [SearchDoctorController],
      providers: [
        {
          provide: SearchDoctorUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(doctorSearch),
          },
        },
      ],
    }).compile();

    searchDoctorsController = modules.get<SearchDoctorController>(
      SearchDoctorController,
    );
    searchDoctorsUseCase =
      modules.get<SearchDoctorUseCase>(SearchDoctorUseCase);
  });

  it('should be defined', () => {
    expect(searchDoctorsController).toBeDefined();
    expect(searchDoctorsUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return a searched doctor', async () => {
      const result = await searchDoctorsController.handle('teste');

      expect(result).toEqual(doctorSearch);
    });
  });
});
