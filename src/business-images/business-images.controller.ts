import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessImagesService } from './business-images.service';
import { CreateBusinessImageDto } from './dto/create-business-image.dto';
import { UpdateBusinessImageDto } from './dto/update-business-image.dto';

@Controller('business-images')
export class BusinessImagesController {
  constructor(private readonly businessImagesService: BusinessImagesService) {}

  @Post()
  create(@Body() createBusinessImageDto: CreateBusinessImageDto) {
    return this.businessImagesService.create(createBusinessImageDto);
  }

  @Get()
  findAll() {
    return this.businessImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessImageDto: UpdateBusinessImageDto) {
    return this.businessImagesService.update(+id, updateBusinessImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessImagesService.remove(+id);
  }
}
