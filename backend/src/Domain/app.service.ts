import { Injectable } from '@nestjs/common';

abstract class AppServiceAbstract {
  abstract getHello(): string;
}

@Injectable()
export class AppService implements AppServiceAbstract {
  getHello(): string {
    throw new Error('Method not implemented.');
  }
  // getHello(): string {
  //   return 'Hello World!';
  // }
}
