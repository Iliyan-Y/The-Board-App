import { Gateway } from 'src/Gateways/app.gateway';

export class Repository implements Gateway {
  getData(): string {
    throw new Error('Method not implemented.');
  }
}
