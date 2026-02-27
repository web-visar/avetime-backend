import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership } from './entities/membership.entity';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto): Promise<Membership> {
    return this.membershipsService.create(createMembershipDto);
  }

  @Get()
  findAll(
    @Query('businessId') businessId?: string,
    @Query('userId') userId?: string,
  ): Promise<Membership[]> {
    if (businessId) {
      return this.membershipsService.findByBusiness(businessId);
    }
    if (userId) {
      return this.membershipsService.findByUser(userId);
    }
    return this.membershipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Membership> {
    return this.membershipsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ): Promise<Membership> {
    return this.membershipsService.update(id, updateMembershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.membershipsService.remove(id);
  }
}
