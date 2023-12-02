import { AutoMap } from '@automapper/classes';

export class CreateRequest {
  @AutoMap()
  boardName: string;
  constructor(boardName: string) {
    this.boardName = boardName;
  }
}
