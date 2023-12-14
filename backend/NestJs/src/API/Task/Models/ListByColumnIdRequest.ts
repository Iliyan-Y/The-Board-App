import { AutoMap } from "@automapper/classes";

export class ListByColumnIdRequest {
  @AutoMap()
  columnId: string;
}
