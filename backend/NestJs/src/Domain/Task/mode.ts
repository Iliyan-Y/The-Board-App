import { AutoMap } from "@automapper/classes";
import { BoardColumnModel } from "../BoardColumn/model";

export class TaskModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap(() => BoardColumnModel)
  column: BoardColumnModel;
}
