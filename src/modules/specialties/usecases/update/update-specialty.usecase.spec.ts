import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';
import { UpdateSpecialtyUseCase } from './update-specialty.usecase';

const specialty = new Specialty('updated specialty');

describe('Update specialty usecase', () => {
  let updateSpecialtyUseCase: UpdateSpecialtyUseCase;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSpecialtyUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            merge: jest.fn().mockResolvedValue(specialty),
            findOne: jest.fn().mockResolvedValue(specialty),
            find: jest.fn().mockResolvedValue(specialty),
            save: jest.fn().mockResolvedValue(specialty),
          },
        },
      ],
    }).compile();

    updateSpecialtyUseCase = module.get<UpdateSpecialtyUseCase>(
      UpdateSpecialtyUseCase,
    );

    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(updateSpecialtyUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('execute', () => {
    it('should updated specialty', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await updateSpecialtyUseCase.execute('1', {
        description: 'updated specialty',
      });

      expect(result).toEqual(specialty);
    });

    it('should not update specialty not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      try {
        await updateSpecialtyUseCase.execute('1', {
          description: 'updated specialty',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should not update specialty with the same description', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([specialty]);
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
