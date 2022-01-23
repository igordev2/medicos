import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';
import { UpdateSpecialtyUseCase } from './update-specialty.usecase';

const specialty = new Specialty('updated specialty');

describe('Update specialty usecase', () => {
  let updateSpecialtyUseCase: UpdateSpecialtyUseCase;
  let specialtiesRepository: SpecialtiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSpecialtyUseCase,
        {
          provide: SpecialtiesRepository,
          useValue: {
            Update: jest.fn().mockResolvedValue(specialty),
            Get: jest.fn().mockResolvedValue(specialty),
            FindByDescription: jest.fn().mockReturnValue(specialty),
          },
        },
      ],
    }).compile();

    updateSpecialtyUseCase = module.get<UpdateSpecialtyUseCase>(
      UpdateSpecialtyUseCase,
    );

    specialtiesRepository = module.get<SpecialtiesRepository>(
      SpecialtiesRepository,
    );
  });

  it('should be defined', () => {
    expect(updateSpecialtyUseCase).toBeDefined();
    expect(specialtiesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should updated specialty', async () => {
      jest
        .spyOn(specialtiesRepository, 'FindByDescription')
        .mockResolvedValue(null);

      const result = await updateSpecialtyUseCase.execute('1', {
        description: 'updated specialty',
      });

      expect(result).toEqual(specialty);
    });

    it('should not update specialty not found', async () => {
      jest.spyOn(specialtiesRepository, 'Get').mockResolvedValue(null);

      try {
        await updateSpecialtyUseCase.execute('1', {
          description: 'updated specialty',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should not update specialty with the same description', async () => {
      try {
        await updateSpecialtyUseCase.execute('1', {
          description: 'updated specialty',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
