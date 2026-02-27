import { Controller } from '@nestjs/common';
import { BusinessLogosService } from './business-logos.service';

@Controller('business-logos')
export class BusinessLogosController {
  constructor(private readonly businessLogosService: BusinessLogosService) {}
}
