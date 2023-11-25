import { Injectable } from '@nestjs/common';

@Injectable
export abstract class Gateway {
  abstract getData(): string;
}
