import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';
import { AppContextProvider } from 'src/core/providers/context.provider';

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
    const lang = this.appContext.getLang();
    console.log(`Finding business lang: ${lang}`);
    const businesses = await this.entityManager.find(Business, {
      order: { createdAt: 'DESC' },
      relations: { city: true },
    });
    return businesses.map((business) => {
      business.city.name = business.city.translations?.[lang] || business.city.name;
      return business;
    });
  }

  async findOneByLink(link: string): Promise<Business> {
    const lang = this.appContext.getLang();
    const business = await this.entityManager.findOne(Business, {
      where: { link },
      relations: { city: true },
    });
    if (business) {
      business.city.name = business.city.translations?.[lang] || business.city.name;
    }

    if (!business) {
      throw new NotFoundException(`Business with link '${link}' not found`);
    }
    return business;
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.entityManager.findOne(Business, {
      where: { id },
      relations: { city: true },
    });

    if (!business) {
      throw new NotFoundException(`Business with ID '${id}' not found`);
    }

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
