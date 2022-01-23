import { Test, TestingModule } from '@nestjs/testing';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorController } from './create-doctor.controller';
import { CreateDoctorUseCase } from './create-doctor.usecase';

const doctor: Doctor = new Doctor({ name: 'Igor', crm: 123 });

describe('Create specialty controller', () => {
  let createDoctorController: CreateDoctorController;
  let createDoctorUseCase: CreateDoctorUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateDoctorController],
      providers: [
        {
          provide: CreateDoctorUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(doctor),
          },
        },
      ],
    }).compile();

    createDoctorController = module.get<CreateDoctorController>(
      CreateDoctorController,
    );
    createDoctorUseCase = module.get<CreateDoctorUseCase>(CreateDoctorUseCase);
  });

  it('should be defined', () => {
    expect(createDoctorController).toBeDefined();
    expect(createDoctorUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return the creation of a specialty', async () => {
      const body: CreateDoctorDto = {
        name: 'Igor',
        crm: 123,
        cellPhone: 123456,
        landline: 123456,
        zipCode: 1346,
        specialties: ['1', '2'],
      };
      const result = await createDoctorController.handle(body);

      expect(result).toEqual(doctor);
      expect(createDoctorUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
