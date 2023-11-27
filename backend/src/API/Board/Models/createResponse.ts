import { AutoMap } from '@automapper/classes';

export class CreateResponse {
  @AutoMap()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
