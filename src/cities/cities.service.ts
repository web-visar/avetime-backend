import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IAutocompleteOption } from 'src/core/interfaces/autocomplete-option.interface';
import { AppContextProvider } from 'src/core/providers/context.provider';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly appContext: AppContextProvider,
  ) {}

  async search(query: string): Promise<IAutocompleteOption[]> {
    const lang = this.appContext.getLang();
    const cities = await this.entityManager
      .createQueryBuilder(City, 'city')
      .leftJoinAndSelect('city.country', 'country')
      .addSelect('word_similarity(city.name, :query)', 'similarity')
      .setParameter('query', query)
      .orderBy('similarity', 'DESC')
      .take(10)
      .getMany();

    return cities.map((city) => ({
      text: city.translations?.[lang] || city.name,
      value: city.id,
      meta: {
        countryName: city.country?.translations?.[lang] || city.country?.name,
        countryCode: city.countryCode,
        valueIs: 'cityId',
      },
    }));
  }

  async findAll() {
    const lang = this.appContext.getLang();
    const cities = await this.entityManager.find(City, { relations: ['country'] });
    return cities.map((city) => {
      city.name = city.translations?.[lang] || city.name;
      city.country.name = city.country?.translations?.[lang] || city.country?.name;
      return city;
    });
  }
}
