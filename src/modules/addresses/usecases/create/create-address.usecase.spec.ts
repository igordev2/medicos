import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../entities/address.entity';
import { CreateAddressUseCase } from './create-address.usecase';

const address = new Address({
  zipCode: '123',
  streetAddress: 'teste',
  locality: 'sp',
});

describe('Create specialty usecase', () => {
  let createAddressUseCase: CreateAddressUseCase;
  let repository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAddressUseCase,
        {
          provide: getRepositoryToken(Address),
          useValue: {
            create: jest.fn().mockResolvedValue(address),
            save: jest.fn().mockResolvedValue(address),
          },
        },
      ],
    }).compile();

    createAddressUseCase =
      module.get<CreateAddressUseCase>(CreateAddressUseCase);

    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(createAddressUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('execute', () => {
    it('should created specialty', async () => {
      const result = await createAddressUseCase.execute({
        zipCode: '123',
        streetAddress: 'teste',
        locality: 'sp',
      });

      expect(result).toEqual(address);
    });
  });
});
