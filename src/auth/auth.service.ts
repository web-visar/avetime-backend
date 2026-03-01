import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import type { StringValue } from 'ms';
import { AppContextProvider } from 'src/core/providers/context.provider';
import { EntityManager } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Membership } from '../memberships/entities/membership.entity';
import {
  DEFAULT_JWT_EXPIRES_IN,
  DEFAULT_JWT_REFRESH_EXPIRES_IN,
  JWT_EXPIRES_IN_KEY,
  JWT_REFRESH_EXPIRES_IN_KEY,
  JWT_REFRESH_SECRET_KEY,
  JWT_SECRET_KEY,
} from './constantes';
import { LoginDto, RegisterDto } from './dto';
import { AuthenticatedUser, JwtPayload, TokenPair } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
    private readonly appContext: AppContextProvider,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthenticatedUser> {
    const existingUser = await this.entityManager.findOne(User, {
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.entityManager.create(User, {
      email: registerDto.email,
      password: hashedPassword,
      fullName: registerDto.fullName,
    });

    const savedUser = await this.entityManager.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      fullName: savedUser.fullName,
    };
  }

  async login(loginDto: LoginDto): Promise<TokenPair> {
    const user = await this.entityManager.findOne(User, {
      where: { email: loginDto.email },
      select: ['id', 'email', 'password', 'fullName'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>(JWT_REFRESH_SECRET_KEY),
      });

      const user = await this.entityManager.findOne(User, {
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateAccessToken(accessToken: string): Promise<AuthenticatedUser> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
        secret: this.configService.get<string>(JWT_SECRET_KEY),
      });

      const user = await this.entityManager.findOne(User, {
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      };
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async getProfile(): Promise<AuthenticatedUser> {
    const userId = this.appContext.requireUserId();
    const user = await this.entityManager.findOne(User, {
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const memberships = await this.entityManager.find(Membership, {
      where: { userId: user.id },
      select: ['role'],
    });

    const roles = Array.from(
      new Set(
        memberships
          .map((m) => m.role)
          .filter((role): role is string => typeof role === 'string' && role.length > 0),
      ),
    );

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles,
    };
  }

  private async generateTokens(user: User): Promise<TokenPair> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessTokenExpiresIn = this.configService.get<StringValue>(JWT_EXPIRES_IN_KEY) || DEFAULT_JWT_EXPIRES_IN;
    const refreshTokenExpiresIn = this.configService.get<StringValue>(JWT_REFRESH_EXPIRES_IN_KEY) || DEFAULT_JWT_REFRESH_EXPIRES_IN;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(JWT_SECRET_KEY),
        expiresIn: accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(JWT_REFRESH_SECRET_KEY),
        expiresIn: refreshTokenExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  getCookieOptions(isProduction: boolean) {
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ('strict' as const) : ('lax' as const),
      path: '/',
    };
  }

  getAccessTokenCookieOptions(isProduction: boolean) {
    return {
      ...this.getCookieOptions(isProduction),
      maxAge: 15 * 60 * 1000, // 15 minutes
    };
  }

  getRefreshTokenCookieOptions(isProduction: boolean) {
    return {
      ...this.getCookieOptions(isProduction),
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
  }
}
