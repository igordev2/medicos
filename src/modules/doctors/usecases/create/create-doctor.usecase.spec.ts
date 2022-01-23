import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressesRepository } from '../../../addresses/repository/addresses.repository';
import { CreateAddressUseCase } from '../../../addresses/usecases/create/create-address.usecase';
import { SpecialtiesRepository } from '../../../specialties/repository/specialties.repository';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorsRepository } from '../../repository/doctors.repository';
import { CreateDoctorUseCase } from './create-doctor.usecase';

const doctor: Doctor = new Doctor({
  name: 'Igor',
  crm: 123,
  cellPhone: 1234,
  landline: 12345,
});

describe('Create Doctor usecase', () => {
  let createDoctorUseCase: CreateDoctorUseCase;
  let doctorsRepository: DoctorsRepository;
  let specialtiesRepository: SpecialtiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDoctorUseCase,
        CreateAddressUseCase,
        {
          provide: SpecialtiesRepository,
          useValue: {
            Get: jest.fn().mockResolvedValue(doctor),
          },
        },
        {
          provide: AddressesRepository,
          useValue: {
            Create: jest.fn().mockResolvedValue(doctor),
          },
        },
        {
          provide: DoctorsRepository,
          useValue: {
            Create: jest.fn().mockResolvedValue(doctor),
            Get: jest.fn().mockResolvedValue(doctor),
            FindByDescription: jest.fn().mockReturnValue(doctor),
          },
        },
      ],
    }).compile();

    createDoctorUseCase = module.get<CreateDoctorUseCase>(CreateDoctorUseCase);

    doctorsRepository = module.get<DoctorsRepository>(DoctorsRepository);

    specialtiesRepository = module.get<SpecialtiesRepository>(
      SpecialtiesRepository,
    );
  });

  it('should be defined', () => {
    expect(createDoctorUseCase).toBeDefined();
    expect(doctorsRepository).toBeDefined();
    expect(specialtiesRepository).toBeDefined();
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
      jest.spyOn(specialtiesRepository, 'Get').mockResolvedValue(null);
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
