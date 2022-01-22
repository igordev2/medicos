import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface ICep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export class ViaCep {
  static async getCep(zipCode: string) {
    try {
      const response = await axios.get<ICep>(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      );

      return response.data;
    } catch (error) {
      throw new BadRequestException('zipCode invalid!');
    }
  }
}
