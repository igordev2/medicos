import { Test, TestingModule } from '@nestjs/testing';
import { DeleteSpecialtyController } from './delete-specialty.controller';
import { DeleteSpecialtyUseCase } from './delete-specialty.usecase';

describe('Delete specialty controller', () => {
  let deleteSpecialtyController: DeleteSpecialtyController;
  let deleteSpecialtyUseCase: DeleteSpecialtyUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteSpecialtyController],
      providers: [
        {
          provide: DeleteSpecialtyUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    deleteSpecialtyController = module.get<DeleteSpecialtyController>(
      DeleteSpecialtyController,
    );
    deleteSpecialtyUseCase = module.get<DeleteSpecialtyUseCase>(
      DeleteSpecialtyUseCase,
    );
  });

  it('should be defined', () => {
    expect(deleteSpecialtyController).toBeDefined();
    expect(deleteSpecialtyUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should remove specialty', async () => {
      const result = await deleteSpecialtyController.handle('1');

      expect(result).toBeUndefined();
      expect(deleteSpecialtyUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
