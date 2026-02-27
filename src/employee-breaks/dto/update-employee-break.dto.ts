import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeBreakDto } from './create-employee-break.dto';

export class UpdateEmployeeBreakDto extends PartialType(CreateEmployeeBreakDto) {}
