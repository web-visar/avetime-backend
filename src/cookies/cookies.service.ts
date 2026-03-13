import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Injectable()
export class CookiesService {
  constructor(private readonly configService: ConfigService) {}
  setCookie(name: string, value: string, res: Response) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.cookie(name, value, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      domain: isProduction ? '.avetime.com' : undefined,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }

  clearCookie(name: string, res: Response) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.clearCookie(name, {
      domain: isProduction ? '.avetime.com' : undefined,
    });
  }

  getCookie(name: string, req: Request): string | null {
    const cookie = req.cookies?.[name] || null;
    return cookie;
  }
}
