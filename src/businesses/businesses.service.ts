import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { City } from 'src/cities/entities/city.entity';
import { AppContextProvider } from 'src/core/providers/context.provider';
import { EntityManager, IsNull } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly appContext: AppContextProvider,
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const existing = await this.entityManager.findOne(Business, {
      where: { link: createBusinessDto.link },
    });

    if (existing) {
      throw new ConflictException(`Business with link '${createBusinessDto.link}' already exists`);
    }

    const business = this.entityManager.create(Business, createBusinessDto);
    return await this.entityManager.save(Business, business);
  }

  async findAll(): Promise<Business[]> {
    const businesses = await this.entityManager.find(Business, {
      order: { createdAt: 'DESC' },
    });
    console.log('lang in service', this.appContext.getLang());
    await Promise.all(
      businesses.map(async (business) => {
        let city: City | null = null;
        city = await this.entityManager.findOne(City, {
          where: [{ cityGroupId: business.cityGroupId, lang: this.appContext.getLang() }],
        });
        if (!city) {
          city = await this.entityManager.findOne(City, {
            where: [{ cityGroupId: business.cityGroupId, lang: IsNull() }],
          });
        }
        if (city) business.city = city;
      }),
    );
    return businesses;
  }

  async findOneByLink(link: string): Promise<Business> {
    const business = await this.entityManager.findOne(Business, {
      where: { link },
    });

    if (!business) {
      throw new NotFoundException(`Business with link '${link}' not found`);
    }
    let city: City | null = null;
    city = await this.entityManager.findOne(City, {
      where: { cityGroupId: business.cityGroupId, lang: this.appContext.getLang() },
    });
    if (!city) {
      city = await this.entityManager.findOne(City, {
        where: {
          cityGroupId: business.cityGroupId,
          lang: IsNull(),
        },
      });
    }
    if (city) business.city = city;
    return business;
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.entityManager.findOne(Business, {
      where: { id },
      relations: {
        city: true,
      },
    });

    if (!business) {
      throw new NotFoundException(`Business with ID '${id}' not found`);
    }

    let city: City | null = null;
    city = await this.entityManager.findOne(City, {
      where: { cityGroupId: business.cityGroupId, lang: this.appContext.getLang() },
    });
    if (!city) {
      city = await this.entityManager.findOne(City, {
        where: { cityGroupId: business.cityGroupId, lang: IsNull() },
      });
    }
    if (city) business.city = city;

    return business;
  }

  async update(id: string, updateBusinessDto: UpdateBusinessDto): Promise<Business> {
    const business = await this.findOne(id);
    Object.assign(business, updateBusinessDto);
    return await this.entityManager.save(Business, business);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    await this.findOne(id);
    await this.entityManager.delete(Business, { id });
    return { deleted: true };
  }
}
