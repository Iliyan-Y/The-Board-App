import { Module } from '@nestjs/common';
import { AppController } from './API/app.controller';
import { AppService } from './Domain/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
