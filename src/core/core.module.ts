import { Global, Module } from '@nestjs/common';
import { AppContextProvider } from './providers/context.provider';

@Global()
@Module({
  providers: [AppContextProvider],
  exports: [AppContextProvider],
})
export class CoreModule {}
