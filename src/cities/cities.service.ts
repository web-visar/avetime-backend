import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IAutocompleteOption } from 'src/core/interfaces/autocomplete-option.interface';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';
import { Country } from 'src/countries/entities/country.entity';

@Injectable()
export class CitiesService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async search(query: string, lang: string): Promise<IAutocompleteOption[]> {
    const cities = await this.entityManager
      .createQueryBuilder(City, 'city')
      .leftJoinAndSelect(Country, 'country', 'country.code = city.countryCode AND country.lang = :countryLang', { countryLang: lang })
      .where('city.lang = :lang OR city.lang IS NULL', { lang })
      .addSelect('word_similarity(city.name, :query)', 'similarity')
      .setParameter('query', query)
      .orderBy('similarity', 'DESC')
      .take(10)
      .getRawMany();

    return cities.map((data) => ({
      text: data.city_name,
      value: data.city_id,
      meta: {
        countryName: data.country_name,
      },
    }));
  }

  findAll(lang: string) {
    return this.entityManager.find(City, { where: { lang } });
  }
}
