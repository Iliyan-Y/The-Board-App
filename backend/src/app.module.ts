import { Module } from '@nestjs/common';
import { AppController } from './API/app.controller';
import { AppService } from './Domain/app.service';
import { Gateway } from './Gateways/app.gateway';
import { Repository } from './Gateways.DB/app.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, { provide: Gateway, useClass: Repository }],
})
export class AppModule {}
