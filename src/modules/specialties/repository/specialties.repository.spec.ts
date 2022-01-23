import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../entities/specialty.entity';
import { SpecialtiesRepository } from './specialties.repository';

const specialty: Specialty[] = [
  new Specialty('specialty1'),
  new Specialty('specialty2'),
  new Specialty('specialty3'),
  new Specialty('specialty4'),
];

describe('Repository specialties', () => {
  let specialtiesRepository: SpecialtiesRepository;
  let repository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialtiesRepository,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            create: jest.fn().mockReturnValue(specialty[0]),
            find: jest.fn().mockResolvedValue(specialty),
            merge: jest.fn().mockReturnValue(specialty[0]),
            save: jest.fn().mockResolvedValue(specialty[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    specialtiesRepository = module.get<SpecialtiesRepository>(
      SpecialtiesRepository,
    );

    repository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );
  });

  it('should be defined', () => {
    expect(specialtiesRepository).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('CRUD Specialties Repository', () => {
    // it('CREATE', async () => {
    //   const result = await specialtiesRepository.Create(specialty[0]);
    //   expect(result).toEqual(specialty[0]);
    // });
    //   it('UPDATE', async () => {
    //     const result = await specialtiesRepository.Update(specialty[0]);
    //     expect(result).toEqual(specialty[0]);
    //   });
    //   it('DELETE', async () => {
    //     const result = await specialtiesRepository.Delete(specialty[0].id);
    //     expect(result).toBeUndefined();
    //   });
    //   it('GET', async () => {
    //     const result = await specialtiesRepository.Get(specialty[0].id);
    //     expect(result).toEqual(specialty[0]);
    //   });
    //   it('GETALL', async () => {
    //     const result = await specialtiesRepository.GetAll();
    //     expect(result).toEqual(specialty);
    //   });
    //   it('FINDBYDESCRIPTION', async () => {
    //     const result = await specialtiesRepository.FindByDescription(
    //       specialty[0].description,
    //     );
    //     expect(result).toEqual(specialty[0]);
    //   });
    //   it('FINDBYIDS', async () => {
    //     const result = await specialtiesRepository.FindByIds(['1', '2']);
    //     expect(result).toEqual(specialty);
    //   });
  });
});
