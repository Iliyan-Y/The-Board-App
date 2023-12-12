import { AutoMap } from "@automapper/classes";

export class BoardColumnModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
}
