import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';
import { DeleteSpecialtyUseCase } from './delete-specialty.usecase';

const specialty = new Specialty('specialty');

describe('Delete specialty usecase', () => {
  let deleteSpecialtyUseCase: DeleteSpecialtyUseCase;
  let specialtiesRepository: SpecialtiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSpecialtyUseCase,
        {
          provide: SpecialtiesRepository,
          useValue: {
            softDelete: jest.fn().mockResolvedValue(undefined),
            Get: jest.fn().mockResolvedValue(specialty),
          },
        },
      ],
    }).compile();

    deleteSpecialtyUseCase = module.get<DeleteSpecialtyUseCase>(
      DeleteSpecialtyUseCase,
    );

    specialtiesRepository = module.get<SpecialtiesRepository>(
      SpecialtiesRepository,
    );
  });

  it('should be defined', () => {
    expect(deleteSpecialtyUseCase).toBeDefined();
    expect(specialtiesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should remove specialty', async () => {
      const result = await deleteSpecialtyUseCase.execute('1');

      expect(result).toBeUndefined();
    });

    it('should not remove specialty not found', async () => {
      jest.spyOn(specialtiesRepository, 'Get').mockResolvedValue(null);

      try {
        await deleteSpecialtyUseCase.execute('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
