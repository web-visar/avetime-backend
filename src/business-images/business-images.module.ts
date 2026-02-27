import { Module } from '@nestjs/common';
import { BusinessImagesService } from './business-images.service';
import { BusinessImagesController } from './business-images.controller';

@Module({
  controllers: [BusinessImagesController],
  providers: [BusinessImagesService],
})
export class BusinessImagesModule {}
