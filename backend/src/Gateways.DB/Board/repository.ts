import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/Gateways/Board/entity";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { Repository } from "typeorm";

export class BoardRepository implements BoardGateway {
  constructor(
    @InjectRepository(Board)
    private repository: Repository<Board>,
  ) {}

  async findOne(id: string): Promise<Board> {
    const board = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        columns: true,
      },
    });
    return board;
  }

  async exist(model: Board): Promise<boolean> {
    const res = await this.repository.find({
      where: {
        name: model.name,
      },
    });
    return res.length > 0;
  }

  async create(model: Board): Promise<Board> {
    const board = this.repository.create(model);
    await this.repository.save(board);
    return board;
  }
}
