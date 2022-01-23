import { Test, TestingModule } from '@nestjs/testing';
import { Doctor } from '../../entities/doctor.entity';
import { ListDoctorsController } from './list-doctors.controller';
import { ListDoctorsUseCase } from './list-doctors.usecase';

const doctors: Doctor[] = [
  new Doctor({ name: 'Igor', crm: 123 }),
  new Doctor({ name: 'Igor2', crm: 1233 }),
  new Doctor({ name: 'Igor2', crm: 1234 }),
  new Doctor({ name: 'Igor2', crm: 1235 }),
];

describe('List specialties controller', () => {
  let listDoctorsController: ListDoctorsController;
  let listDoctorsUseCase: ListDoctorsUseCase;

  beforeEach(async () => {
    const modules: TestingModule = await Test.createTestingModule({
      controllers: [ListDoctorsController],
      providers: [
        {
          provide: ListDoctorsUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(doctors),
          },
        },
      ],
    }).compile();

    listDoctorsController = modules.get<ListDoctorsController>(
      ListDoctorsController,
    );
    listDoctorsUseCase = modules.get<ListDoctorsUseCase>(ListDoctorsUseCase);
  });

  it('should be defined', () => {
    expect(listDoctorsController).toBeDefined();
    expect(listDoctorsUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return doctors', async () => {
      const result = await listDoctorsController.handle();

      expect(result).toEqual(doctors);
    });
  });
});
