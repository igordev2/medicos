import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    DoctorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
