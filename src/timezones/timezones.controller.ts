import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TimezonesService } from './timezones.service';
import { CreateTimezoneDto } from './dto/create-timezone.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';

@Controller('timezones')
export class TimezonesController {
  constructor(private readonly timezonesService: TimezonesService) {}

  @Post()
  create(@Body() createTimezoneDto: CreateTimezoneDto) {
    return this.timezonesService.create(createTimezoneDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string, @Query('countryCode') countryCode?: string) {
    return this.timezonesService.findAll(lang, countryCode);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timezonesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimezoneDto: UpdateTimezoneDto) {
    return this.timezonesService.update(id, updateTimezoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timezonesService.remove(id);
  }
}
