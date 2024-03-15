import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfigs } from 'typeOrm.config';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => (ormconfigs),
    }),
  ],
})
export class DatabaseModule {}
