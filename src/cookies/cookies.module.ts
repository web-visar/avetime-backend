import { Module } from '@nestjs/common';
import { CookiesService } from './cookies.service';
import { CookiesController } from './cookies.controller';

@Module({
  controllers: [CookiesController],
  providers: [CookiesService],
})
export class CookiesModule {}
