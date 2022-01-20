import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { SpecialtiesModule } from './specialties/specialties.module';

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
      synchronize: false,
      migrations: ['src/typeorm/migration'],
      cli: {
        migrationsDir: 'src/typeorm/migration',
      },
    }),
    DoctorsModule,
    AddressesModule,
    SpecialtiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
