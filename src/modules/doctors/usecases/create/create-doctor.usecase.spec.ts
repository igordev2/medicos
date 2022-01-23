import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../../specialties/entities/specialty.entity';
import { CreateAddressUseCase } from '../../../addresses/usecases/create/create-address.usecase';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorUseCase } from './create-doctor.usecase';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../../addresses/entities/address.entity';

const doctor: Doctor = new Doctor({
  name: 'Igor',
  crm: 123,
  cellPhone: 1234,
  landline: 12345,
});

describe('Create Doctor usecase', () => {
  let createDoctorUseCase: CreateDoctorUseCase;
  let doctorsRepository: Repository<Doctor>;
  let specialtiesRepository: Repository<Specialty>;
  let addressesRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDoctorUseCase,
        CreateAddressUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            findOne: jest.fn().mockResolvedValue(doctor),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            create: jest.fn().mockResolvedValue(doctor),
            save: jest.fn().mockResolvedValue(doctor),
          },
        },
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            create: jest.fn().mockResolvedValue(doctor),
            save: jest.fn().mockResolvedValue(doctor),
            findOne: jest.fn().mockResolvedValue(doctor),
            find: jest.fn().mockReturnValue(doctor),
          },
        },
      ],
    }).compile();

    createDoctorUseCase = module.get<CreateDoctorUseCase>(CreateDoctorUseCase);

    doctorsRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );

    specialtiesRepository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );

    addressesRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
  });

  it('should be defined', () => {
    expect(createDoctorUseCase).toBeDefined();
    expect(doctorsRepository).toBeDefined();
    expect(specialtiesRepository).toBeDefined();
    expect(addressesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should created doctor', async () => {
      const result = await createDoctorUseCase.execute({
        name: 'Igor',
        crm: 123,
        cellPhone: 1234,
        landline: 12345,
        zipCode: 13568812,
        specialties: ['1', '2'],
      });
      expect(result).toEqual(doctor);
    });

    it('should not create a doctor as a non-existent specialty', async () => {
      jest.spyOn(specialtiesRepository, 'findOne').mockResolvedValue(null);
      try {
        await createDoctorUseCase.execute({
          name: 'Igor',
          crm: 123,
          cellPhone: 1234,
          landline: 12345,
          zipCode: 13568812,
          specialties: ['1', '2'],
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
