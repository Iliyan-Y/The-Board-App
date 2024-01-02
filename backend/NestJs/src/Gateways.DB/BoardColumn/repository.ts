import { InjectRepository } from "@nestjs/typeorm";
import { BoardColumn } from "src/Gateways/BoardColumn/entity";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class BoardColumnRepository implements BoardColumnGateway {
  constructor(
    @InjectRepository(BoardColumn)
    private repository: Repository<BoardColumn>,
  ) {}

  async create(model: BoardColumn): Promise<BoardColumn> {
    model.id = uuidv4();
    const column = this.repository.create(model);
    await this.repository.save(column);
    return column;
  }
}
