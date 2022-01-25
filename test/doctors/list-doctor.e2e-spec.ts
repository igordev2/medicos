import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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

  it('(GET) -> /api/v1/doctors ', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/doctors');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
