import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { randomUUID } from 'crypto';
import { AppModule } from '../../src/app.module';

describe('Doctors (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(DELETE) -> /api/v1/doctors/:id ', async () => {
    const specialty1 = await request(app.getHttpServer())
      .post('/api/v1/specialties')
      .send({
        description: `${randomUUID()}`,
      });

    const specialty2 = await request(app.getHttpServer())
      .post('/api/v1/specialties')
      .send({
        description: `${randomUUID()}`,
      });

    const doctor = await request(app.getHttpServer())
      .post('/api/v1/doctors')
      .send({
        name: 'Igor de Souza Bezerra',
        crm: 123456,
        landline: 1633068772,
        cellPhone: 16997654486,
        zipCode: 13568812,
        specialties: [specialty1.body.id, specialty2.body.id],
      });

    const response = await request(app.getHttpServer()).delete(
      `/api/v1/doctors/${doctor.body.id}`,
    );

    expect(response.statusCode).toBe(204);
  });
});
