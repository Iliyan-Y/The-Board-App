import { Gateway } from 'src/Gateways/app.gateway';

export class Repository implements Gateway {
  getData(): string {
    return 'BOOOO';
  }
}
