import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';
import { CreateSpecialtyUseCase } from './create.specialty.usecase';

const specialty = new Specialty('created specialty');

describe('Create specialty usecase', () => {
  let createSpecialtyUseCase: CreateSpecialtyUseCase;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSpecialtyUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            create: jest.fn().mockResolvedValue(specialty),
            findOne: jest.fn().mockReturnValue(specialty),
            save: jest.fn().mockReturnValue(specialty),
          },
        },
      ],
    }).compile();

    createSpecialtyUseCase = module.get<CreateSpecialtyUseCase>(
      CreateSpecialtyUseCase,
    );

    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(createSpecialtyUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('execute', () => {
    it('should created specialty', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await createSpecialtyUseCase.execute({
        description: 'created specialty',
      });
      expect(result).toEqual(specialty);
    });

    it('should not create specialty with the same description', async () => {
      try {
        await createSpecialtyUseCase.execute({
          description: 'created specialty',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
