import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressesRepository } from './repository/addresses.repository';
import { CreateAddressUseCase } from './usecases/create/create-address.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Address, AddressesRepository])],
  providers: [CreateAddressUseCase],
  exports: [CreateAddressUseCase],
})
export class AddressesModule {}
