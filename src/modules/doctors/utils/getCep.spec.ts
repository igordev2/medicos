import { BadRequestException } from '@nestjs/common';
import { ViaCep } from './getCep';

describe('GET CEP', () => {
  afterEach(() => {
    jest.mock('axios');
  });

  it('should return the address', async () => {
    const result = await ViaCep.getCep(13568812);
    expect(result).toHaveProperty('cep');
  });

  it('should not return the address', async () => {
    try {
      await ViaCep.getCep(123);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
