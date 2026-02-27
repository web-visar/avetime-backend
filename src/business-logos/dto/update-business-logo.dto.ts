import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessLogoDto } from './create-business-logo.dto';

export class UpdateBusinessLogoDto extends PartialType(CreateBusinessLogoDto) {}
