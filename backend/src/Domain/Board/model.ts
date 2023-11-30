import { AutoMap } from '@automapper/classes';

export class BoardModel {
  @AutoMap()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
