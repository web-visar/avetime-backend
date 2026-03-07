import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Business } from 'src/businesses/entities/business.entity';
import { extractTokenFromCookie } from 'src/core/helpers';
import { Membership } from 'src/memberships/entities/membership.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityManager } from 'typeorm';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectEntityManager()
    private entityManager: EntityManager,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    request.lang = request.cookies?.lang;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    const token = extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.entityManager.findOne(User, {
        where: { id: payload.sub },
        select: ['id', 'email', 'fullName'],
      });
      request['user'] = user;
      if (!user) throw new UnauthorizedException('User not found');

      const membership = await this.entityManager.findOne(Membership, {
        where: { user: { id: payload.sub }, isDefault: true },
      });
      if (!membership) throw new UnauthorizedException('Membership not found');
      request['membership'] = membership;

      if (membership.businessId) {
        const bussiness = await this.entityManager.findOne(Business, {
          where: { id: membership.businessId },
        });
        if (!bussiness) throw new UnauthorizedException('Business not found');
        request['business'] = bussiness;
      }
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }
}
