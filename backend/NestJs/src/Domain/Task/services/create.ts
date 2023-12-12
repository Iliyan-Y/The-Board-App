import { AutoMap } from "@automapper/classes";

export class CreateCommand {
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  columnId: string;
  constructor(name: string, description: string, columnId: string) {
    this.name = name;
    this.columnId = columnId;
    this.description = description;
  }
}
