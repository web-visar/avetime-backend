import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Response, Request } from 'express';
import { CookiesService } from './cookies.service';
import { Public } from 'src/auth/decorators';

@Controller('cookies')
@Public()
export class CookiesController {  
  constructor(private readonly cookiesService: CookiesService) {}

  @Post('set')
  setCookie(@Body('name') name: string, @Body('value') value: string, @Res({ passthrough: true }) res: Response) {
    this.cookiesService.setCookie(name, value, res);
    return { success: true };
  }

  @Post('clear')
  clearCookie(@Body('name') name: string, @Res({ passthrough: true }) res: Response) {
    this.cookiesService.clearCookie(name, res);
    return { success: true };
  }

  @Post('get')
  getCookie(@Body('name') name: string, @Req() req: Request) {
    const cookie = this.cookiesService.getCookie(name, req);
    return { value: cookie };
  }
}
