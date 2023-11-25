import { Module } from '@nestjs/common';
import { AppModule } from './Modules/app.module';

@Module({
  imports: [AppModule],
})
export class MainModule {}
