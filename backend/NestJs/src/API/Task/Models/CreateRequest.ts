import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";

export class CreateRequest {
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  url: string;

  @AutoMap()
  @IsNotEmpty()
  columnId: string;
}
