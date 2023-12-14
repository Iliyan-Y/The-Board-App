import { AutoMap } from "@automapper/classes";
import { TaskModel } from "../Task/mode";

export class BoardColumnModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap(() => [TaskModel])
  tasks: TaskModel[];
}
