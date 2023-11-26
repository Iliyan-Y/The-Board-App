import { Injectable } from '@nestjs/common';
import { BoardModel } from './model';
import { BoardGateway } from 'src/Gateways/Board/gateway';

abstract class BoardServiceAbstract {
  abstract create(name: string): Promise<BoardModel>;
}

@Injectable()
export class BoardService implements BoardServiceAbstract {
  constructor(private readonly gateway: BoardGateway) {}

  async create(name: string): Promise<BoardModel> {
    const resFromGayeway = await this.gateway.create(name);
    console.log(resFromGayeway);
    // TODO: mapp res to BoardModel
    return new BoardModel(name);
  }
}
