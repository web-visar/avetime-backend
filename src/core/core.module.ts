import { Module } from '@nestjs/common';
import { AppContextProvider } from './providers/context.provider';

@Module({
  providers: [AppContextProvider],
  exports: [AppContextProvider],
})
export class CoreModule {}
