import { Controller, Get } from '@nestjs/common';
import { BoardService, CreateCommand } from 'src/Domain/Board/service';

@Controller()
export class BoardController {
  constructor(private readonly service: BoardService) {}

  @Get()
  async get(): Promise<string> {
    await this.service.create(new CreateCommand('bobo'));
    return 'OK';
  }
}
