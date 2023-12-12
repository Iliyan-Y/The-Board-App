import { AutoMap } from "@automapper/classes";

export class CreateResponse {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
}
