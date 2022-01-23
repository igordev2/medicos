import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
