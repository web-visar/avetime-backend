import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

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
  findOneByLink(@Param('link') link: string) {
    return this.businessesService.findOneByLink(link);
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(id);
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
