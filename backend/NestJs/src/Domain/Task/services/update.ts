import { AutoMap } from "@automapper/classes";

export class UpdateCommand {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  columnId: string;

  constructor(id: string, name: string, description: string, columnId: string) {
    this.id = id;
    this.name = name;
    this.columnId = columnId;
    this.description = description;
  }
}
