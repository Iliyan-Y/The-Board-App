import { InjectRepository } from "@nestjs/typeorm";
import { BoardColumn } from "src/Gateways/BoardColumn/entitiy";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";
import { Repository } from "typeorm";

export class BoardColumnRepository implements BoardColumnGateway {
  constructor(
    @InjectRepository(BoardColumn)
    private repository: Repository<BoardColumn>,
  ) {}

  async create(model: BoardColumn): Promise<BoardColumn> {
    const column = this.repository.create(model);
    await this.repository.save(column);
    return column;
  }
}
