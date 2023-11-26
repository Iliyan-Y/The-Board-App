import { Injectable } from '@nestjs/common';
import { Board } from './entity';

@Injectable()
export abstract class BoardGateway {
  abstract create(name: string): Promise<Board>;
}
