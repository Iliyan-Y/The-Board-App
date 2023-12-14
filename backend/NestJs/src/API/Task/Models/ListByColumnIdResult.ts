import { AutoMap } from "@automapper/classes";

export class ListByColumnIdResult {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  columnId: string;
}
