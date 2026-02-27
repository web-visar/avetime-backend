import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Membership } from './entities/membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    // Check if membership already exists
    const existing = await this.entityManager.findOne(Membership, {
      where: {
        userId: createMembershipDto.userId,
        businessId: createMembershipDto.businessId,
      },
    });

    if (existing) {
      throw new ConflictException('User already has a membership in this business');
    }

    const membership = this.entityManager.create(Membership, {
      userId: createMembershipDto.userId,
      businessId: createMembershipDto.businessId,
      isActive: createMembershipDto.isActive ?? true,
      acceptedAt: new Date(),
    });

    return this.entityManager.save(membership);
  }

  async findAll(): Promise<Membership[]> {
    return this.entityManager.find(Membership, {
      relations: ['user', 'business', 'membershipRole'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByBusiness(businessId: string): Promise<Membership[]> {
    return this.entityManager.find(Membership, {
      where: { businessId },
      relations: ['user', 'membershipRole'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Membership[]> {
    return this.entityManager.find(Membership, {
      where: { userId },
      relations: ['business', 'membershipRole'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Membership> {
    const membership = await this.entityManager.findOne(Membership, {
      where: { id },
      relations: ['user', 'business', 'membershipRole'],
    });

    if (!membership) {
      throw new NotFoundException(`Membership with id "${id}" not found`);
    }

    return membership;
  }

  async findByUserAndBusiness(userId: string, businessId: string): Promise<Membership> {
    const membership = await this.entityManager.findOne(Membership, {
      where: { userId, businessId },
      relations: ['membershipRole'],
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    return membership;
  }

  async update(id: string, updateMembershipDto: UpdateMembershipDto): Promise<Membership> {
    const membership = await this.findOne(id);

    if (updateMembershipDto.isActive !== undefined) {
      membership.isActive = updateMembershipDto.isActive;
    }

    return this.entityManager.save(membership);
  }

  async remove(id: string): Promise<void> {
    const membership = await this.findOne(id);
    await this.entityManager.remove(membership);
  }
}
