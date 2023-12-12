import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";

export class CreateRequest {
  @AutoMap()
  @IsNotEmpty()
  boardName: string;
}
