import { Controller, Get, Param, Res } from '@nestjs/common';
import { type Response } from 'express';

@Controller()
export class AppController {
  @Get('set-lang/:lang')
  setLang(
    @Param('lang') lang: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('lang', lang, {
      httpOnly: false,
      sameSite: 'lax',
    });

    return { success: true };
  }
}
