import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Cookies } from 'src/core/decorators/cookies.decorator';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategoriesService } from './service-categories.service';
import { Public } from 'src/auth/decorators';

@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(private readonly serviceCategoriesService: ServiceCategoriesService) {}

  @Post()
  create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return this.serviceCategoriesService.create(createServiceCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    console.log('Fetching service categories');
    return this.serviceCategoriesService.findAll();
  }

  @Public()
  @Get('search')
  search(@Query('query') query: string) {
    return this.serviceCategoriesService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceCategoryDto: UpdateServiceCategoryDto) {
    return this.serviceCategoriesService.update(id, updateServiceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceCategoriesService.remove(id);
  }
}
