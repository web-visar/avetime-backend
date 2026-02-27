import { Module } from '@nestjs/common';
import { EmployeeBreaksService } from './employee-breaks.service';
import { EmployeeBreaksController } from './employee-breaks.controller';

@Module({
  controllers: [EmployeeBreaksController],
  providers: [EmployeeBreaksService],
})
export class EmployeeBreaksModule {}
