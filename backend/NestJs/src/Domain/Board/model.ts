import { AutoMap } from "@automapper/classes";
import { BoardColumnModel } from "../BoardColumn/model";

export class BoardModel {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;

  @AutoMap(() => [BoardColumnModel])
  columns: BoardColumnModel[];
}
