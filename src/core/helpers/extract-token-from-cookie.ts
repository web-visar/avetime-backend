import { Request } from 'express';
import { COOKIE_ACCESS_TOKEN } from 'src/auth/constantes';

export function extractTokenFromCookie(request: Request): string | undefined {
  return request.cookies?.[COOKIE_ACCESS_TOKEN];
}
