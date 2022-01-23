import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressUseCase } from './usecases/create/create-address.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [CreateAddressUseCase],
  exports: [CreateAddressUseCase],
})
export class AddressesModule {}
