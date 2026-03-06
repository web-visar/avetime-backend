import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Business } from 'src/businesses/entities/business.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityManager } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Country } from '../../countries/entities/country.entity';
import { ServiceCategory } from '../../service-categories/entities/service-category.entity';
import { Timezone } from '../../timezones/entities/timezone.entity';
import { citiesData } from './cities.seed';
import { countriesData } from './countries.seed';
import { serviceCategoriesData } from './service-categories.seed';
import { timezonesData } from './timezones.seed';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    this.logger.log('Starting database seeding...');

    await this.seedRoles();
    await this.seedCountries();
    await this.seedCities();
    await this.seedTimezones();
    await this.seedServiceCategories();
    await this.seedSuperAdminAndDefaultBusiness();

    this.logger.log('Database seeding completed!');
  }

  private async seedRoles() {
    this.logger.log('Seeding roles...');
    const roles = ['superadmin', 'admin', 'user', 'customer'];
    for (const role of roles) {
      const existing = await this.entityManager.findOne(Role, {
        where: { name: role },
      });

      if (!existing) {
        const roleEntity = this.entityManager.create(Role, { name: role });
        await this.entityManager.save(roleEntity);
        this.logger.log(`Created role: ${role}`);
      }
    }
    this.logger.log('Roles seeding completed');
  }

  private async seedSuperAdminAndDefaultBusiness() {
    this.logger.log('Seeding superadmin user and default business...');

    const superAdminEmail = this.configService.get<string>('DEFAULT_ADMIN_EMAIL');
    const superAdminPassword = this.configService.get<string>('DEFAULT_ADMIN_PASSWORD');
    const superAdminFullName = this.configService.get<string>('DEFAULT_ADMIN_FULLNAME');
    if (!superAdminEmail || !superAdminPassword || !superAdminFullName) {
      this.logger.warn('Superadmin credentials are not fully set in environment variables. Skipping superadmin seeding.');
      return;
    }
    const existing = await this.entityManager.findOne(User, {
      where: { email: superAdminEmail },
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
      const superAdmin = this.entityManager.create(User, {
        email: superAdminEmail,
        password: hashedPassword,
        fullName: superAdminFullName,
      });
      await this.entityManager.save(superAdmin);
      this.logger.log(`Created superadmin user: ${superAdminEmail}`);

      // Assign superadmin role
      const membership = this.entityManager.create(Membership, {
        userId: superAdmin.id,
        role: 'superadmin',
        isDefault: true,
      });
      await this.entityManager.save(membership);
      this.logger.log(`Created superadmin membership for user: ${superAdminEmail}`);
    } else {
      this.logger.log('Superadmin user already exists');
    }

    this.logger.log('Superadmin seeding completed');
  }

  private async seedCountries() {
    this.logger.log('Seeding countries...');

    for (const countryData of countriesData) {
      const existing = await this.entityManager.findOne(Country, {
        where: { code: countryData.code, lang: countryData.lang },
      });

      if (!existing) {
        const country = this.entityManager.create(Country, countryData);
        await this.entityManager.save(country);
        this.logger.log(`Created country: ${countryData.name} (${countryData.lang})`);
      }
    }

    this.logger.log('Countries seeding completed');
  }

  private async seedTimezones() {
    this.logger.log('Seeding timezones...');

    for (const timezoneData of timezonesData) {
      const existing = await this.entityManager.findOne(Timezone, {
        where: {
          tzCode: timezoneData.tzCode,
          lang: timezoneData.lang,
        },
      });

      if (!existing) {
        const timezone = this.entityManager.create(Timezone, timezoneData);
        await this.entityManager.save(timezone);
        this.logger.log(`Created timezone: ${timezoneData.tzCode} (${timezoneData.lang})`);
      }
    }

    this.logger.log('Timezones seeding completed');
  }

  private async seedCities() {
    this.logger.log('Seeding cities...');

    for (const cityData of citiesData) {
      const whereClause: any = {
        name: cityData.name,
        countryCode: cityData.countryCode,
      };

      if (cityData.lang !== null) {
        whereClause.lang = cityData.lang;
      } else {
        whereClause.lang = null;
      }

      const existing = await this.entityManager.findOne(City, {
        where: whereClause,
      });

      if (!existing) {
        const city = this.entityManager.create(City, cityData);
        await this.entityManager.save(city);
        this.logger.log(`Created city: ${cityData.name}, ${cityData.countryCode} (${cityData.lang || 'no lang'})`);
      }
    }

    this.logger.log('Cities seeding completed');
  }

  private async seedServiceCategories() {
    this.logger.log('Seeding service categories...');

    for (const categoryData of serviceCategoriesData) {
      const existing = await this.entityManager.findOne(ServiceCategory, {
        where: {
          code: categoryData.code,
          lang: categoryData.lang,
        },
      });

      if (!existing) {
        const serviceCategory = this.entityManager.create(ServiceCategory, categoryData);
        await this.entityManager.save(serviceCategory);
        this.logger.log(`Created service category: ${categoryData.name} (${categoryData.lang})`);
      }
    }

    this.logger.log('Service categories seeding completed');
  }
}
