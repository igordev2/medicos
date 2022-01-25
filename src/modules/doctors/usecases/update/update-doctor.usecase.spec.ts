import { Test, TestingModule } from '@nestjs/testing';
import { Specialty } from '../../../specialties/entities/specialty.entity';
import { CreateAddressUseCase } from '../../../addresses/usecases/create/create-address.usecase';
import { Doctor } from '../../entities/doctor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../../addresses/entities/address.entity';
import { UpdateDoctorUseCase } from './update-doctor.usecase';

const doctor: Doctor = new Doctor({
  name: 'Igor update',
  crm: 123,
  cellPhone: 1234,
  landline: 12345,
});

const specialty = new Specialty('specialty test');

const address = new Address({
  zipCode: '123',
  uf: 'sp',
  locality: 'sp',
  neighborhood: 'sp',
});

describe('Update Doctor usecase', () => {
  let updateDoctorUseCase: UpdateDoctorUseCase;
  let doctorsRepository: Repository<Doctor>;
  let specialtiesRepository: Repository<Specialty>;
  let addressesRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateDoctorUseCase,
        CreateAddressUseCase,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            findOne: jest.fn().mockResolvedValue(specialty),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            create: jest.fn().mockResolvedValue(address),
            save: jest.fn().mockResolvedValue(address),
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

    updateDoctorUseCase = module.get<UpdateDoctorUseCase>(UpdateDoctorUseCase);

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
    expect(updateDoctorUseCase).toBeDefined();
    expect(doctorsRepository).toBeDefined();
    expect(specialtiesRepository).toBeDefined();
    expect(addressesRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should update doctor', async () => {
      const id = '123';

      const result = await updateDoctorUseCase.execute(id, {
        name: 'Igor update',
        crm: 123,
        cellPhone: 1234,
        landline: 12345,
        zipCode: 13568812,
        specialties: ['1', '2'],
      });
      expect(result).toEqual(doctor);
    });
  });
});
