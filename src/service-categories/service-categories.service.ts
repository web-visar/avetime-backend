import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IAutocompleteOption } from 'src/core/interfaces/autocomplete-option.interface';
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
      },
    });

    if (existing) {
      throw new ConflictException(
        `Service category with code '${createServiceCategoryDto.code}' already exists`,
      );
    }

    const serviceCategory = this.entityManager.create(ServiceCategory, createServiceCategoryDto);
    return await this.entityManager.save(serviceCategory);
  }

  async search(query: string, lang: string): Promise<IAutocompleteOption[]> {
    const options = await this.entityManager
      .createQueryBuilder(ServiceCategory, 'category')
      .where('category.lang = :lang', { lang })
      .andWhere('category.isActive = :isActive', { isActive: true })
      .addSelect('word_similarity(category.name, :query)', 'similarity')
      .setParameter('query', query)
      .orderBy('similarity', 'DESC')
      .addOrderBy('category.sortOrder', 'ASC')
      .take(10)
      .getMany();

    return options.map((category) => ({
      value: category.code,
      text: category.name,
      meta: {
        valueId: 'code',
      },
    }));
  }

  async findAll(lang: string): Promise<ServiceCategory[]> {
    const query = this.entityManager.createQueryBuilder(ServiceCategory, 'category');
    query.andWhere('category.isActive = :isActive', { isActive: true });
    query.orderBy('category.sortOrder', 'ASC');
    query.addOrderBy('category.name', 'ASC');
    const categories = await query.getMany();

    // If lang is provided, filter translations

    return categories.map((category) => {
      category.name = category.translations?.[lang] || category.name;
      category.description = category.descriptionTranslations?.[lang] || category.description;
      return category;
    });
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

  async findByCode(code: string): Promise<ServiceCategory[]> {
    return await this.entityManager.find(ServiceCategory, {
      where: { code },
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
