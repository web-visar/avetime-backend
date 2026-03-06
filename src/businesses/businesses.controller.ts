import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Public } from 'src/auth/decorators';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessesService.create(createBusinessDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.businessesService.findAll();
  }

  @Get(':link')
  @Public()
  findOne(@Param('link') link: string) {
    return this.businessesService.findOne(link);
  }

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.businessesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessesService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessesService.remove(id);
  }
}
