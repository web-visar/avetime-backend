import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/auth/decorators';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Public()
  @Get('search')
  search(@Query('query') query: string) {
    return this.citiesService.search(query);
  }

  @Public()
  @Get()
  findAll() {
    return this.citiesService.findAll();
  }
}
