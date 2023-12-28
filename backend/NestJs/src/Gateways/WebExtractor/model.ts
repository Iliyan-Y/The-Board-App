import { AutoMap } from "@automapper/classes";

export class ExtractorPageModel {
  @AutoMap() public taskId: string;
  @AutoMap() public boardId: string;
  @AutoMap() public url: string;
  constructor(taskId: string, boardId: string, url: string) {
    this.taskId = taskId;
    this.boardId = boardId;
    this.url = url;
  }
}
