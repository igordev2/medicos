import { Test, TestingModule } from '@nestjs/testing';
import { CreateAddressDto } from '../../dtos/create-adress.dto';
import { Address } from '../../entities/address.entity';
import { CreateAddressController } from './create-address.controller';
import { CreateAddressUseCase } from './create-address.usecase';

const address = new Address({
  zipCode: '123',
  streetAddress: 'teste',
  locality: 'sp',
});

describe('Create specialty controller', () => {
  let createSpecialtyController: CreateAddressController;
  let createSpecialtyUseCase: CreateAddressUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAddressController],
      providers: [
        {
          provide: CreateAddressUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(address),
          },
        },
      ],
    }).compile();

    createSpecialtyController = module.get<CreateAddressController>(
      CreateAddressController,
    );
    createSpecialtyUseCase =
      module.get<CreateAddressUseCase>(CreateAddressUseCase);
  });

  it('should be defined', () => {
    expect(createSpecialtyController).toBeDefined();
    expect(createSpecialtyUseCase).toBeDefined();
  });

  describe('handle', () => {
    it('should return the creation of a specialty', async () => {
      const body: CreateAddressDto = {
        zipCode: '123',
        streetAddress: 'teste',
        locality: 'sp',
      };
      const result = await createSpecialtyController.handle(body);

      expect(result).toEqual(address);
      expect(createSpecialtyUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
