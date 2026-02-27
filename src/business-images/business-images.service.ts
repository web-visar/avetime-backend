import { Injectable } from '@nestjs/common';
import { CreateBusinessImageDto } from './dto/create-business-image.dto';
import { UpdateBusinessImageDto } from './dto/update-business-image.dto';

@Injectable()
export class BusinessImagesService {
  create(createBusinessImageDto: CreateBusinessImageDto) {
    return 'This action adds a new businessImage';
  }

  findAll() {
    return `This action returns all businessImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessImage`;
  }

  update(id: number, updateBusinessImageDto: UpdateBusinessImageDto) {
    return `This action updates a #${id} businessImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessImage`;
  }
}
