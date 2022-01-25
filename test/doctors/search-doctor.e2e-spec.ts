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

  it('(GET) -> /api/v1/doctors/search', async () => {
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

    const searchName = randomUUID();

    const doctor = await request(app.getHttpServer())
      .post('/api/v1/doctors')
      .send({
        name: searchName,
        crm: 123456,
        landline: 1633068772,
        cellPhone: 16997654486,
        zipCode: 13568812,
        specialties: [specialty1.body.id, specialty2.body.id],
      });

    const search = await request(app.getHttpServer())
      .get('/api/v1/doctors/search')
      .query({ name: doctor.body.name });

    expect(search.body[0].name).toEqual(searchName);
  });
});
