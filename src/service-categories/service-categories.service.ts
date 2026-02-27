import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';

@Injectable()
export class ServiceCategoriesService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async create(createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    // Check if category with same code and language already exists
    const existing = await this.entityManager.findOne(ServiceCategory, {
      where: {
        code: createServiceCategoryDto.code,
        lang: createServiceCategoryDto.lang,
      },
    });

    if (existing) {
      throw new ConflictException(
        `Service category with code '${createServiceCategoryDto.code}' and language '${createServiceCategoryDto.lang}' already exists`,
      );
    }

    const serviceCategory = this.entityManager.create(ServiceCategory, createServiceCategoryDto);
    return await this.entityManager.save(serviceCategory);
  }

  async findAll(lang: string): Promise<ServiceCategory[]> {
    const query = this.entityManager.createQueryBuilder(ServiceCategory, 'category');

    if (lang) {
      query.where('category.lang = :lang', { lang });
    }

    query.andWhere('category.isActive = :isActive', { isActive: true });
    query.orderBy('category.sortOrder', 'ASC');
    query.addOrderBy('category.name', 'ASC');

    return await query.getMany();
  }

  async findOne(id: string): Promise<ServiceCategory> {
    const serviceCategory = await this.entityManager.findOne(ServiceCategory, {
      where: { id },
    });

    if (!serviceCategory) {
      throw new NotFoundException(`Service category with ID '${id}' not found`);
    }

    return serviceCategory;
  }

  async findByCodeAndLang(code: string, lang: string): Promise<ServiceCategory> {
    const serviceCategory = await this.entityManager.findOne(ServiceCategory, {
      where: { code, lang },
    });

    if (!serviceCategory) {
      throw new NotFoundException(`Service category with code '${code}' and language '${lang}' not found`);
    }

    return serviceCategory;
  }

  async findByCode(code: string): Promise<ServiceCategory[]> {
    return await this.entityManager.find(ServiceCategory, {
      where: { code },
      order: { lang: 'ASC' },
    });
  }

  async update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<ServiceCategory> {
    const serviceCategory = await this.findOne(id);

    Object.assign(serviceCategory, updateServiceCategoryDto);

    return await this.entityManager.save(serviceCategory);
  }

  async remove(id: string): Promise<void> {
    const serviceCategory = await this.findOne(id);
    await this.entityManager.remove(serviceCategory);
  }

  async softDelete(id: string): Promise<ServiceCategory> {
    const serviceCategory = await this.findOne(id);
    serviceCategory.isActive = false;
    return await this.entityManager.save(serviceCategory);
  }
}
