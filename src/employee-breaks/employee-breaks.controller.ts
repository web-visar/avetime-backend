import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeBreaksService } from './employee-breaks.service';
import { CreateEmployeeBreakDto } from './dto/create-employee-break.dto';
import { UpdateEmployeeBreakDto } from './dto/update-employee-break.dto';

@Controller('employee-breaks')
export class EmployeeBreaksController {
  constructor(private readonly employeeBreaksService: EmployeeBreaksService) {}

  @Post()
  create(@Body() createEmployeeBreakDto: CreateEmployeeBreakDto) {
    return this.employeeBreaksService.create(createEmployeeBreakDto);
  }

  @Get()
  findAll() {
    return this.employeeBreaksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeBreaksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeBreakDto: UpdateEmployeeBreakDto) {
    return this.employeeBreaksService.update(+id, updateEmployeeBreakDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeBreaksService.remove(+id);
  }
}
