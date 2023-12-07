import { AutoMap } from '@automapper/classes';

export class BoardModel {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;
}
