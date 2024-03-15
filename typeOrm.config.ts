import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';



config({ path: '.env.development' });

const configService = new ConfigService();

export const ormconfigs: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
  migrations: ['./dist/migrations/*.js'],
  entities: [User]
};

export default new DataSource(ormconfigs);