import { Controller, Get, Query } from '@nestjs/common';
import { Cookies } from 'src/core/decorators/cookies.decorator';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('search')
  search(@Query('term') term: string, @Cookies('lang') lang: string) {
    return this.countriesService.search(term, lang);
  }
}
