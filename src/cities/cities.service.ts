import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AutocompleteOption } from 'src/core/interfaces/autocomplete-option.interface';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async search(term: string, lang: string): Promise<AutocompleteOption[]> {
    const cities = await this.entityManager
      .createQueryBuilder(City, 'city')
      .where(`city.lang = :lang`, { lang })
      .addSelect('word_similarity(city.name, :term)', 'similarity')
      .orderBy('similarity', 'DESC')
      .setParameter('term', term)
      .take(10)
      .getMany();

    return cities.map((city) => ({
      text: city.name,
      value: city.id,
    }));
  }

  findAll(lang: string) {
    return this.entityManager.find(City, { where: { lang } });
  }
}
