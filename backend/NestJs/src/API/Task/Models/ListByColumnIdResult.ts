import { AutoMap } from "@automapper/classes";

export class ListByColumnIdResult {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  url: string;

  @AutoMap()
  columnId: string;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;
}
