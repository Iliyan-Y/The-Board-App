import { Injectable } from '@nestjs/common';
import { Gateway } from 'src/Gateways/app.gateway';

abstract class AppServiceAbstract {
  abstract getHello(): string;
}

@Injectable()
export class AppService implements AppServiceAbstract {
  constructor(private readonly gatewayService: Gateway) {}

  getHello(): string {
    return this.gatewayService.getData();
  }
}
