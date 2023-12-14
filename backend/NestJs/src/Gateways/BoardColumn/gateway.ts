import { Injectable } from "@nestjs/common";
import { BoardColumn } from "./entity";

@Injectable()
export abstract class BoardColumnGateway {
  abstract create(model: BoardColumn): Promise<BoardColumn>;
}
