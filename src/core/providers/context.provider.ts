import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { MissingContextException } from '../exceptions/context.exception';
import { User } from 'src/users/entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';

interface RequestWithContext extends Request {
  user?: User;
  business?: Business;
}

@Injectable({ scope: Scope.REQUEST })
export class AppContextProvider {
  constructor(@Inject(REQUEST) private readonly request: RequestWithContext) {}

  /**
   * Get the current authenticated user
   */
  getUser(): User | null {
    return this.request.user || null;
  }

  /**
   * Get a specific property from the current user
   */
  getUserProperty<K extends keyof User>(key: K): User[K] | null {
    const user = this.getUser();
    return user ? user[key] : null;
  }

  /**
   * Get the user ID
   */
  getUserId(): string | null {
    return this.getUserProperty('id');
  }

  /**
   * Get the user ID or throw exception if not available
   */
  requireUserId(): string {
    const userId = this.getUserId();
    if (!userId) {
      throw new MissingContextException('user');
    }
    return userId;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  /**
   * Get full context information
   */
  getContext() {
    return {
      user: this.getUser(),
      isAuthenticated: this.isAuthenticated(),
    };
  }
}
