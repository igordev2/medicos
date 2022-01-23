import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from '../../dtos/create-adress.dto';
import { Address } from '../../entities/address.entity';
import { CreateAddressUseCase } from './create-address.usecase';

@Controller('api/v1/address')
@ApiTags('Addresses')
export class CreateAddressController {
  constructor(private readonly createAddress: CreateAddressUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create address' })
  @ApiResponse({
    status: 200,
    description: 'created address',
    type: Address,
  })
  async handle(@Body() createAddressDto: CreateAddressDto) {
    return await this.createAddress.execute(createAddressDto);
  }
}
