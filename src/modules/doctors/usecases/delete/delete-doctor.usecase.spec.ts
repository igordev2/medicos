import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Address } from '../../../addresses/entities/address.entity';
import { AddressesRepository } from '../../../addresses/repository/addresses.repository';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorsRepository } from '../../repository/doctors.repository';
import { DeleteDoctorUseCase } from './delete-doctor.usecase';

const doctor = new Doctor({
  name: 'Igor',
  crm: 123,
  address: {
    id: '1',
    zipCode: '123',
    locality: 'sp',
    uf: 'sp',
    neighborhood: 'teste',
    streetAddress: 'test',
    createdAt: new Date(),
    deletedAt: null,
  },
});
const address = new Address({ zipCode: '122', uf: 'sp' });

describe('Delete specialty usecase', () => {
  let deleteDoctorUseCase: DeleteDoctorUseCase;
  let doctorsRepository: DoctorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteDoctorUseCase,
        {
          provide: DoctorsRepository,
          useValue: {
            softDelete: jest.fn().mockResolvedValue(undefined),
            Get: jest.fn().mockResolvedValue(doctor),
          },
        },
        {
          provide: AddressesRepository,
          useValue: {
            softDelete: jest.fn().mockResolvedValue(address),
          },
        },
      ],
    }).compile();

    deleteDoctorUseCase = module.get<DeleteDoctorUseCase>(DeleteDoctorUseCase);

    doctorsRepository = module.get<DoctorsRepository>(DoctorsRepository);
  });

  it('should be defined', () => {
    expect(deleteDoctorUseCase).toBeDefined();
    expect(doctorsRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should remove doctor', async () => {
      const result = await deleteDoctorUseCase.execute('1');

      expect(result).toBeUndefined();
    });

    it('should not remove doctor not found', async () => {
      jest.spyOn(doctorsRepository, 'Get').mockResolvedValue(null);

      try {
        await deleteDoctorUseCase.execute('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
