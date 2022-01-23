import { Test, TestingModule } from '@nestjs/testing';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorsRepository } from '../../repository/doctors.repository';
import { ListDoctorsUseCase } from './list-doctors.usecase';

const doctors: Doctor[] = [
  new Doctor({ name: 'Igor', crm: 123 }),
  new Doctor({ name: 'Igor2', crm: 1233 }),
  new Doctor({ name: 'Igor2', crm: 1234 }),
  new Doctor({ name: 'Igor2', crm: 1235 }),
];

describe('List specialties usecase', () => {
  let listDoctorsUseCase: ListDoctorsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListDoctorsUseCase,
        {
          provide: DoctorsRepository,
          useValue: {
            GetAll: jest.fn().mockResolvedValue(doctors),
          },
        },
      ],
    }).compile();

    listDoctorsUseCase = module.get<ListDoctorsUseCase>(ListDoctorsUseCase);
  });

  it('should be defined', () => {
    expect(listDoctorsUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a doctors list successfuly', async () => {
      const result = await listDoctorsUseCase.execute();

      expect(result).toEqual(doctors);
    });
  });
});
