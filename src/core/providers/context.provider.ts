import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { Business } from 'src/businesses/entities/business.entity';
import { Membership } from 'src/memberships/entities/membership.entity';
import { User } from 'src/users/entities/user.entity';
import { MissingContextException } from '../exceptions/context.exception';

interface RequestWithContext extends Request {
  user?: User;
  business?: Business;
  membership?: Membership;
  lang?: string;
}

@Injectable({ scope: Scope.REQUEST })
export class AppContextProvider {
  constructor(@Inject(REQUEST) private readonly request: RequestWithContext) {}

  getUser(): User | null {
    return this.request.user || null;
  }

  getLang(): string {
    return this.request.lang || 'en';
  }

  getUserProperty<K extends keyof User>(key: K): User[K] | null {
    const user = this.getUser();
    return user ? user[key] : null;
  }

  getUserId(): string | null {
    return this.getUserProperty('id');
  }

  requireUserId(): string {
    const userId = this.getUserId();
    if (!userId) {
      throw new MissingContextException('user');
    }
    return userId;
  }

  getBusiness(): Business | null {
    return this.request.business || null;
  }

  getBusinessProperty<K extends keyof Business>(key: K): Business[K] | null {
    const business = this.getBusiness();
    return business ? business[key] : null;
  }

  getBusinessId(): string | null {
    return this.getBusinessProperty('id');
  }

  requireBusinessId(): string {
    const businessId = this.getBusinessId();
    if (!businessId) {
      throw new MissingContextException('business');
    }
    return businessId;
  }

  getMembership(): Membership | null {
    return this.request.membership || null;
  }

  getMembershipProperty<K extends keyof Membership>(key: K): Membership[K] | null {
    const membership = this.getMembership();
    return membership ? membership[key] : null;
  }

  getMembershipId(): string | null {
    return this.getMembershipProperty('id');
  }

  requireMembershipId(): string {
    const membershipId = this.getMembershipId();
    if (!membershipId) {
      throw new MissingContextException('membership');
    }
    return membershipId;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  getContext() {
    return {
      user: this.getUser(),
      membership: this.getMembership(),
      business: this.getBusiness(),
      isAuthenticated: this.isAuthenticated(),
    };
  }
}
