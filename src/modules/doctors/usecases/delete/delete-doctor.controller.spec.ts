import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDoctorController } from './delete-doctor.controller';
import { DeleteDoctorUseCase } from './delete-doctor.usecase';

describe('Delete specialty controller', () => {
  let deleteDoctorController: DeleteDoctorController;
  let deleteDoctorUseCase: DeleteDoctorUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteDoctorController],
      providers: [
        {
          provide: DeleteDoctorUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    deleteDoctorController = module.get<DeleteDoctorController>(
      DeleteDoctorController,
    );
    deleteDoctorUseCase = module.get<DeleteDoctorUseCase>(DeleteDoctorUseCase);
  });

  it('should be defined', () => {
    expect(deleteDoctorController).toBeDefined();
    expect(deleteDoctorUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should remove doctor', async () => {
      const result = await deleteDoctorController.handle('1');

      expect(result).toBeUndefined();
      expect(deleteDoctorUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
