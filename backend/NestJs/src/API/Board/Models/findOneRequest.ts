import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";

export class FindOneRequest {
  @AutoMap()
  @IsNotEmpty()
  id: string;
}
