import { Injectable } from '@nestjs/common';
import { BoardModel } from './model';
import { BoardGateway } from 'src/Gateways/Board/gateway';

export class CreateCommand {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export enum CreateResultStatus {
  Created = 1,
  AlreadyExists = 'AlreadyExists',
  FailedToCreate = 'FailedToCreate',
}

class CreateResult {
  status: CreateResultStatus;
  model: BoardModel;

  constructor(status: CreateResultStatus, model?: BoardModel) {
    (this.model = model), (this.status = status);
  }
}

abstract class BoardServiceAbstract {
  abstract create(command: CreateCommand): Promise<CreateResult>;
}

@Injectable()
export class BoardService implements BoardServiceAbstract {
  constructor(private readonly gateway: BoardGateway) {}

  async create(command: CreateCommand): Promise<CreateResult> {
    const res = await this.gateway.create(command.name);
    console.log(res);
    // TODO: mapp res to BoardModel
    return new CreateResult(CreateResultStatus.Created, new BoardModel('Test'));
  }
}
