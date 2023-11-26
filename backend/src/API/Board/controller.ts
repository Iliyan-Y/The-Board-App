import { Controller, Get } from '@nestjs/common';
import { BoardService } from 'src/Domain/Board/service';

@Controller()
export class BoardController {
  constructor(private readonly service: BoardService) {}

  @Get()
  async get(): Promise<string> {
    await this.service.create('test bombo');
    return 'OK';
  }
}
