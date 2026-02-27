import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateTimezoneDto } from './dto/create-timezone.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';
import { Timezone } from './entities/timezone.entity';

@Injectable()
export class TimezonesService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  create(createTimezoneDto: CreateTimezoneDto) {
    const timezone = this.entityManager.create(Timezone, createTimezoneDto);
    return this.entityManager.save(timezone);
  }

  findAll(lang?: string, countryCode?: string) {
    const query = this.entityManager.createQueryBuilder(Timezone, 'timezone');

    if (lang) {
      query.andWhere('timezone.lang = :lang', { lang });
    }

    if (countryCode) {
      query.andWhere('timezone.countryCode = :countryCode', { countryCode });
    }

    return query.getMany();
  }

  findOne(id: string) {
    return this.entityManager.findOne(Timezone, { where: { id } });
  }

  async update(id: string, updateTimezoneDto: UpdateTimezoneDto) {
    await this.entityManager.update(Timezone, id, updateTimezoneDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.entityManager.delete(Timezone, id);
    return { deleted: true };
  }
}
