import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Cookies } from 'src/core/decorators/cookies.decorator';
import { Public } from 'src/auth/decorators';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Public()
  @Get('search')
  search(@Query('query') query: string, @Cookies('lang') lang: string) {
    return this.citiesService.search(query, lang);
  }

  @Public()
  @Get()
  findAll(@Query('lang') lang: string) {
    return this.citiesService.findAll(lang);
  }
}
