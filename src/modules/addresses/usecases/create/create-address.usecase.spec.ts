import { Test, TestingModule } from '@nestjs/testing';
import { Address } from '../../entities/address.entity';
import { AddressesRepository } from '../../repository/addresses.repository';
import { CreateAddressUseCase } from './create-address.usecase';

const address = new Address({
  zipCode: '123',
  streetAddress: 'teste',
  locality: 'sp',
});

describe('Create specialty usecase', () => {
  let createAddressUseCase: CreateAddressUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAddressUseCase,
        {
          provide: AddressesRepository,
          useValue: {
            Create: jest.fn().mockResolvedValue(address),
          },
        },
      ],
    }).compile();

    createAddressUseCase =
      module.get<CreateAddressUseCase>(CreateAddressUseCase);
  });

  it('should be defined', () => {
    expect(createAddressUseCase).toBeDefined();
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
