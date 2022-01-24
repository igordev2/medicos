import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { randomUUID } from 'crypto';
import { AppModule } from '../../src/app.module';

describe('Specialties (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(POST) -> /api/v1/specialties ', async () => {
    const specialtiy = await request(app.getHttpServer())
      .post('/api/v1/specialties')
      .send({
        description: `${randomUUID()}`,
      });

    const descriptionUpdate = `update ${randomUUID()}`;

    const response = await request(app.getHttpServer())
      .put(`/api/v1/specialties/${specialtiy.body.id}`)
      .send({
        description: descriptionUpdate,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual(descriptionUpdate);
  });
});
