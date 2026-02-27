import { Module } from '@nestjs/common';
import { BusinessLogosService } from './business-logos.service';
import { BusinessLogosController } from './business-logos.controller';

@Module({
  controllers: [BusinessLogosController],
  providers: [BusinessLogosService],
})
export class BusinessLogosModule {}
