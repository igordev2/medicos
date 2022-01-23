import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';
import { CreateSpecialtyUseCase } from './create.specialty.usecase';

const specialty = new Specialty('created specialty');

describe('Create specialty usecase', () => {
  let createSpecialtyUseCase: CreateSpecialtyUseCase;
  let specialtiesRepository: SpecialtiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSpecialtyUseCase,
        {
          provide: SpecialtiesRepository,
          useValue: {
            Create: jest.fn().mockResolvedValue(specialty),
            FindByDescription: jest.fn().mockReturnValue(specialty),
          },
        },
      ],
    }).compile();

    createSpecialtyUseCase = module.get<CreateSpecialtyUseCase>(
      CreateSpecialtyUseCase,
    );

    specialtiesRepository = module.get<SpecialtiesRepository>(
      SpecialtiesRepository,
    );
  });

  it('should be defined', () => {
    expect(createSpecialtyUseCase).toBeDefined();
    expect(specialtiesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should created specialty', async () => {
      jest
        .spyOn(specialtiesRepository, 'FindByDescription')
        .mockResolvedValue(null);

      const result = await createSpecialtyUseCase.execute({
        description: 'created specialty',
      });
      expect(result).toEqual(specialty);
    });

    it('should not create specialty with the same description', async () => {
      try {
        await createSpecialtyUseCase.execute({
          description: 'updated specialty',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
