import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from './constantes';
import { Public } from './decorators';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private get isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.register(registerDto);

    // Auto-login after registration
    const tokens = await this.authService.login({
      email: registerDto.email,
      password: registerDto.password,
    });

    this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {
      message: 'Registration successful',
      user,
    };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(loginDto);
    this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);
    return {
      message: 'Login successful',
    };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies?.[COOKIE_REFRESH_TOKEN];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {
      message: 'Tokens refreshed successfully',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    this.clearAuthCookies(response);

    return {
      message: 'Logout successful',
    };
  }

  @Get('me')
  async getProfile() {
    return this.authService.getProfile();
  }

  private setAuthCookies(response: Response, accessToken: string, refreshToken: string) {
    response.cookie(COOKIE_ACCESS_TOKEN, accessToken, this.authService.getAccessTokenCookieOptions(this.isProduction));
    response.cookie(COOKIE_REFRESH_TOKEN, refreshToken, this.authService.getRefreshTokenCookieOptions(this.isProduction));
  }

  private clearAuthCookies(response: Response) {
    const clearOptions = {
      ...this.authService.getCookieOptions(this.isProduction),
      maxAge: 0,
    };

    response.cookie(COOKIE_ACCESS_TOKEN, '', clearOptions);
    response.cookie(COOKIE_REFRESH_TOKEN, '', clearOptions);
  }
}
