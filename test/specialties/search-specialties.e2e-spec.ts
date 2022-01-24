import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { randomUUID } from 'crypto';

describe('Specialties (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(GET) -> /api/v1/specialties ', async () => {
    const specialtyDescription = `query ${randomUUID()}`;

    await request(app.getHttpServer()).post('/api/v1/specialties').send({
      description: specialtyDescription,
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/specialties')
      .query({ description: specialtyDescription });

    expect(response.statusCode).toBe(200);
    expect(response.body[0].description).toEqual(specialtyDescription);
  });
});
