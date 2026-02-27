import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Country } from '../../countries/entities/country.entity';
import { ServiceCategory } from '../../service-categories/entities/service-category.entity';
import { Timezone } from '../../timezones/entities/timezone.entity';
import { RolesService } from '../../roles/roles.service';
import { citiesData } from './cities.seed';
import { countriesData } from './countries.seed';
import { serviceCategoriesData } from './service-categories.seed';
import { timezonesData } from './timezones.seed';
import { User } from 'src/users/entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { Membership } from 'src/memberships/entities/membership.entity';

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
    await this.seedSuperAdminAndDefaultBusiness();
    await this.seedCountries();
    await this.seedTimezones();
    await this.seedCities();
    await this.seedServiceCategories();

    this.logger.log('Database seeding completed!');
  }

  private async seedRoles() {
    this.logger.log('Seeding roles...');
    const roles = ['superadmin', 'admin', 'user', 'customer'].map((role) => {
      return this.entityManager.create('Role', { name: role });
    });
    const seededRoles = await this.entityManager.save(roles);
    this.logger.log(`Created ${seededRoles.length} roles`);

    this.logger.log('Roles seeding completed');
  }

  private async seedSuperAdminAndDefaultBusiness() {
    this.logger.log('Seeding superadmin user and default business...');

    const superAdminEmail = this.configService.get<string>('DEFAULT_ADMIN_EMAIL', 'admin@leventime.com');
    const superAdminPassword = this.configService.get<string>('DEFAULT_ADMIN_PASSWORD', 'Admin123!');
    const superAdminFullName = this.configService.get<string>('DEFAULT_ADMIN_FULLNAME', 'Super Admin');

    const defaultBusinessName = this.configService.get<string>('DEFAULT_BUSINESS_NAME', 'Default Business');

    const defaultBusiness = await this.entityManager.findOne(Business, {
      where: { name: defaultBusinessName },
    });

    if (!defaultBusiness) {
      const business = this.entityManager.create(Business, {
        name: defaultBusinessName,
        description: '',
        address: '1 allée de la feuillée, 74160 Saint-Julien-en-Genevois, France',
        phone: '+33648962801',
        email: 'contact@avetime.com',
        website: 'avetime.com',
        latitude: 0,
        longitude: 0,
        isActive: true,
        isVerified: true,
      });
      await this.entityManager.save(business);
      this.logger.log(`Created default business: ${defaultBusinessName}`);
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
    } else {
      this.logger.log('Superadmin user already exists');
    }

    const membershipsCount = await this.entityManager.count(Membership);
    if (membershipsCount === 0) {
      const superAdmin = await this.entityManager.findOne(User, {
        where: { email: superAdminEmail },
      });
      const defaultBusiness = await this.entityManager.findOne(Business, {
        where: { name: defaultBusinessName },
      });
      if (superAdmin && defaultBusiness) {
        const membership = this.entityManager.create(Membership, {
          userId: superAdmin.id,
          businessId: defaultBusiness.id,
          isActive: true,
          invitedAt: new Date(),
          acceptedAt: new Date(),
        });
        await this.entityManager.save(membership);
        this.logger.log(`Created membership for superadmin in default business`);
      }
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
