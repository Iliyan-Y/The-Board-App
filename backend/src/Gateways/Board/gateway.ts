import { Injectable } from "@nestjs/common";
import { Board } from "./entity";

@Injectable()
export abstract class BoardGateway {
  abstract get(id: string): Promise<Board>;
  abstract create(model: Board): Promise<Board>;
  abstract exist(model: Board): Promise<boolean>;
}
