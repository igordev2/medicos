import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';
import { DeleteSpecialtyUseCase } from './delete-specialty.usecase';

const specialty = new Specialty('specialty');

describe('Delete specialty usecase', () => {
  let deleteSpecialtyUseCase: DeleteSpecialtyUseCase;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSpecialtyUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            findOne: jest.fn().mockResolvedValue(specialty),
            softDelete: jest.fn().mockReturnValue(specialty),
          },
        },
      ],
    }).compile();

    deleteSpecialtyUseCase = module.get<DeleteSpecialtyUseCase>(
      DeleteSpecialtyUseCase,
    );

    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(deleteSpecialtyUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('execute', () => {
    it('should remove specialty', async () => {
      const result = await deleteSpecialtyUseCase.execute('1');

      expect(result).toBeUndefined();
    });

    it('should not remove specialty not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      try {
        await deleteSpecialtyUseCase.execute('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
