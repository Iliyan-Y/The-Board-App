import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/Gateways/Board/entity';
import { BoardGateway } from 'src/Gateways/Board/gateway';
import { Repository } from 'typeorm';

export class BoardRepository implements BoardGateway {
  constructor(
    @InjectRepository(Board)
    private repository: Repository<Board>,
  ) {}

  async create(name: string): Promise<Board> {
    const board = this.repository.create({ name });
    await this.repository.save(board);
    return board;
  }
}
