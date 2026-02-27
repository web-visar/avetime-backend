import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessesService {
  mockBusinesses = [
    {
      id: 1,
      name: 'Business 1',
      address: 'Address for Business ONE',
    },
    {
      id: 2,
      name: 'Business 2',
      address: 'Address for Business TWO',
    },
  ];

  create(createBusinessDto: CreateBusinessDto) {
    return 'This action adds a new business';
  }

  findAll() {
    return this.mockBusinesses;
  }

  async findOne(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.mockBusinesses.find((business) => business.id === id);
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
