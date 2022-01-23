import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../../addresses/entities/address.entity';
import { Doctor } from '../../entities/doctor.entity';
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
  let doctorsRepository: Repository<Doctor>;
  let addressRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteDoctorUseCase,
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            softDelete: jest.fn().mockResolvedValue(undefined),
            findOne: jest.fn().mockResolvedValue(doctor),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            softDelete: jest.fn().mockResolvedValue(address),
          },
        },
      ],
    }).compile();

    deleteDoctorUseCase = module.get<DeleteDoctorUseCase>(DeleteDoctorUseCase);

    doctorsRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    addressRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
  });

  it('should be defined', () => {
    expect(deleteDoctorUseCase).toBeDefined();
    expect(doctorsRepository).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should remove doctor', async () => {
      const result = await deleteDoctorUseCase.execute('1');

      expect(result).toBeUndefined();
    });

    it('should not remove doctor not found', async () => {
      jest.spyOn(doctorsRepository, 'findOne').mockResolvedValue(null);

      try {
        await deleteDoctorUseCase.execute('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
