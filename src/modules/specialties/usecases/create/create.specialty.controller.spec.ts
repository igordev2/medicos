import { Test, TestingModule } from '@nestjs/testing';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { CreateSpecialtyController } from './create.specialty.controller';
import { CreateSpecialtyUseCase } from './create.specialty.usecase';

const specialty: Specialty = new Specialty('specialty test');

describe('Create specialty controller', () => {
  let createSpecialtyController: CreateSpecialtyController;
  let createSpecialtyUseCase: CreateSpecialtyUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSpecialtyController],
      providers: [
        {
          provide: CreateSpecialtyUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(specialty),
          },
        },
      ],
    }).compile();

    createSpecialtyController = module.get<CreateSpecialtyController>(
      CreateSpecialtyController,
    );
    createSpecialtyUseCase = module.get<CreateSpecialtyUseCase>(
      CreateSpecialtyUseCase,
    );
  });

  it('should be defined', () => {
    expect(createSpecialtyController).toBeDefined();
    expect(createSpecialtyUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return the creation of a specialty', async () => {
      const body: CreateSpecialtiesDto = {
        description: 'specialty test',
      };
      const result = await createSpecialtyController.handle(body);

      expect(result).toEqual(specialty);
      expect(createSpecialtyUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
