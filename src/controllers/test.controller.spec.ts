import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestController } from './test.controller';

describe('TestController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TestController],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Test', () => {
    it('should always true', async () => {
      await request(app.getHttpServer())
        .get(`/test/always_true`)
        .expect(200)
        .expect({
          result: true
        });

    });

    it('should always false', async () => {
      await request(app.getHttpServer())
        .get(`/test/always_false`)
        .expect(200)
        .expect({
          result: false
        });

    });
  })
});
