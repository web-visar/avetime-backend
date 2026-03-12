import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Injectable()
export class CookiesService {
  constructor(private readonly configService: ConfigService) {}
  setCookie(name: string, value: string, res: Response) {
    res.cookie(name, value, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }

  clearCookie(name: string, res: Response) {
    res.clearCookie(name);
  }

  getCookie(name: string, req: Request): string | null {
    const cookie = req.cookies?.[name] || null;
    return cookie;
  }
}
