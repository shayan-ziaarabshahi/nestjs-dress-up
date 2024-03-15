import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
// import DataSource from 'typeOrm.config';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


describe('App e2e', () => {
  let app: INestApplication;
  let httpServer: typeof app.getHttpAdapter;
  let typeorm: typeof DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(5000);
      
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  // test variables to store
  var access_token = '';

  it('should get users', async () => {
    return request(httpServer)
      .get('/users')
      .expect(200)
  });
});
