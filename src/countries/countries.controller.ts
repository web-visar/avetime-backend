import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('search')
  search(@Query('query') query: string, @Query('lang') lang: string) {
    return this.countriesService.search(query, lang);
  }
}
