import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSpecialtiesDto } from '../../dtos/update-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { UpdateSpecialtyController } from './update-specialty.controller';
import { UpdateSpecialtyUseCase } from './update-specialty.usecase';

const specialty: Specialty = new Specialty('updated specialty');

describe('Update specialty controller', () => {
  let updateSpecialtyController: UpdateSpecialtyController;
  let updateSpecialtyUseCase: UpdateSpecialtyUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateSpecialtyController],
      providers: [
        {
          provide: UpdateSpecialtyUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(specialty),
          },
        },
      ],
    }).compile();

    updateSpecialtyController = module.get<UpdateSpecialtyController>(
      UpdateSpecialtyController,
    );
    updateSpecialtyUseCase = module.get<UpdateSpecialtyUseCase>(
      UpdateSpecialtyUseCase,
    );
  });

  it('should be defined', () => {
    expect(updateSpecialtyController).toBeDefined();
    expect(updateSpecialtyUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return the updated of a specialty', async () => {
      const id = '1';
      const body: UpdateSpecialtiesDto = {
        description: 'updated specialty',
      };

      const result = await updateSpecialtyController.handle(id, body);

      expect(result).toEqual(specialty);
      expect(updateSpecialtyUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
