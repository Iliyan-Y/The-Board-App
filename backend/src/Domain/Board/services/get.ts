import { Injectable } from "@nestjs/common";
import { BoardModel } from "../model";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Board } from "src/Gateways/Board/entity";
import { AutoMap } from "@automapper/classes";
import { CreateService } from "./create";

export class GetCommand {
  @AutoMap()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export enum GetResultStatus {
  Found = 1,
  NotFound,
}

class GetResult {
  status: GetResultStatus;
  model: BoardModel;

  constructor(status: GetResultStatus, model?: BoardModel) {
    (this.model = model), (this.status = status);
  }
}

abstract class GetBoard {
  abstract get(command: GetCommand): Promise<GetResult>;
}

@Injectable()
export class GetBoardService implements GetBoard {
  constructor(
    private readonly gateway: BoardGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async get(command: GetCommand): Promise<GetResult> {
    const board = await this.gateway.get(command.id);
    const boardModel = this.mapper.map(board, Board, BoardModel);

    if (!boardModel) return new GetResult(GetResultStatus.NotFound);

    return new GetResult(GetResultStatus.Found, boardModel);
  }
}
