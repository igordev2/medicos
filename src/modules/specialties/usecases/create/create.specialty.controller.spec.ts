import { Test, TestingModule } from '@nestjs/testing';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { CreateSpecialtiesController } from './create.specialty.controller';
import { CreateSpecialtiesUseCase } from './create.specialty.usecase';

const specialty: Specialty = new Specialty('specialty test');

describe('Create specialty controller', () => {
  let createSpecialtyController: CreateSpecialtiesController;
  let createSpecialtyUseCase: CreateSpecialtiesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSpecialtiesController],
      providers: [
        {
          provide: CreateSpecialtiesUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(specialty),
          },
        },
      ],
    }).compile();

    createSpecialtyController = module.get<CreateSpecialtiesController>(
      CreateSpecialtiesController,
    );
    createSpecialtyUseCase = module.get<CreateSpecialtiesUseCase>(
      CreateSpecialtiesUseCase,
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
