import { Injectable } from '@nestjs/common';
import { IAutocompleteOption } from 'src/core/interfaces/autocomplete-option.interface';
import { EntityManager } from 'typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(private readonly entityManager: EntityManager) {}
  async search(term: string, lang: string): Promise<IAutocompleteOption[]> {
    const countries = await this.entityManager
      .createQueryBuilder(Country, 'country')
      .where(`country.lang = :lang`, { lang })
      .addSelect('word_similarity(country.name, :term)', 'similarity')
      .orderBy('similarity', 'DESC')
      .setParameter('term', term)
      .take(10)
      .getMany();

    return countries.map((country) => ({
      text: country.name,
      value: country.code,
      meta: {
        nativeName: country.nativeName,
      },
    }));
  }
}
