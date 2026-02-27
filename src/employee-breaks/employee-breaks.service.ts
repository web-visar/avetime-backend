import { Injectable } from '@nestjs/common';
import { CreateEmployeeBreakDto } from './dto/create-employee-break.dto';
import { UpdateEmployeeBreakDto } from './dto/update-employee-break.dto';

@Injectable()
export class EmployeeBreaksService {
  create(createEmployeeBreakDto: CreateEmployeeBreakDto) {
    return 'This action adds a new employeeBreak';
  }

  findAll() {
    return `This action returns all employeeBreaks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeBreak`;
  }

  update(id: number, updateEmployeeBreakDto: UpdateEmployeeBreakDto) {
    return `This action updates a #${id} employeeBreak`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeBreak`;
  }
}
