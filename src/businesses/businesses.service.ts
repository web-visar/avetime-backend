import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { EntityManager } from 'typeorm';
import { Business } from './entities/business.entity';
import { sleep } from 'src/core/helpers';

@Injectable()
export class BusinessesService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

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
    return await this.entityManager.find(Business, {
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Business> {
    await sleep(1500);
    const business = await this.entityManager.findOne(Business, {
      where: { id },
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
