import { Test, TestingModule } from '@nestjs/testing';
import { UpdateDoctorDto } from '../../dtos/update-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { UpdateDoctorController } from './update-doctor.controller';
import { UpdateDoctorUseCase } from './update-doctor.usecase';

const doctor: Doctor = new Doctor({ name: 'Igor', crm: 123 });

describe('Update specialty controller', () => {
  let updateDoctorController: UpdateDoctorController;
  let updateDoctorUseCase: UpdateDoctorUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateDoctorController],
      providers: [
        {
          provide: UpdateDoctorUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(doctor),
          },
        },
      ],
    }).compile();

    updateDoctorController = module.get<UpdateDoctorController>(
      UpdateDoctorController,
    );
    updateDoctorUseCase = module.get<UpdateDoctorUseCase>(UpdateDoctorUseCase);
  });

  it('should be defined', () => {
    expect(updateDoctorController).toBeDefined();
    expect(updateDoctorUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return the update of a doctor', async () => {
      const id = '123';

      const body: UpdateDoctorDto = {
        name: 'Igor',
        crm: 123,
        cellPhone: 123456,
        landline: 123456,
        zipCode: 1346,
        specialties: ['1', '2'],
      };
      const result = await updateDoctorController.handle(id, body);

      expect(result).toEqual(doctor);
      expect(updateDoctorUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
