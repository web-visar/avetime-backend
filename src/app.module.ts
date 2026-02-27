import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptLanguageResolver, CookieResolver, I18nModule, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import path from 'path';
import { AppController } from './app.controller';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { BusinessImagesModule } from './business-images/business-images.module';
import { BusinessesModule } from './businesses/businesses.module';
import { CitiesModule } from './cities/cities.module';
import { CookiesModule } from './cookies/cookies.module';
import { CountriesModule } from './countries/countries.module';
import { SeedModule } from './database/seeds/seed.module';
import { EmployeeBreaksModule } from './employee-breaks/employee-breaks.module';
import { EmployeePhotosModule } from './employee-photos/employee-photos.module';
import { EmployeeSchedulesModule } from './employee-schedules/employee-schedules.module';
import { EmployeesModule } from './employees/employees.module';
import { MembershipsModule } from './memberships/memberships.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OpeningHoursModule } from './opening-hours/opening-hours.module';
import { RolesModule } from './roles/roles.module';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServicesModule } from './services/services.module';
import { TimezonesModule } from './timezones/timezones.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'avetime'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC', true),
        logging: configService.get('DB_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new CookieResolver(['lang']), AcceptLanguageResolver],
    }),
    CoreModule,
    UsersModule,
    AuthModule,
    CitiesModule,
    CountriesModule,
    NotificationsModule,
    AppointmentsModule,
    EmployeesModule,
    BusinessesModule,
    EmployeeSchedulesModule,
    OpeningHoursModule,
    EmployeeBreaksModule,
    ServicesModule,
    TimezonesModule,
    SeedModule,
    ServiceCategoriesModule,
    BusinessImagesModule,
    EmployeePhotosModule,
    MembershipsModule,
    CookiesModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: I18nValidationPipe,
    },
    {
      provide: APP_FILTER,
      useFactory: () => new I18nValidationExceptionFilter(),
    },
  ],
})
export class AppModule {}
