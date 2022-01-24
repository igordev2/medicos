import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SpecialtiesModule } from '../../src/modules/specialties/specialties.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SpecialtiesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/specialties (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/specialties')
      .expect(200)
      .expect([]);
  });
});
