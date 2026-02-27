import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessImageDto } from './create-business-image.dto';

export class UpdateBusinessImageDto extends PartialType(CreateBusinessImageDto) {}
