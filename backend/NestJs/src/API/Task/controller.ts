import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Controller, HttpException, HttpStatus, Post } from "@nestjs/common";

@Controller()
export class TaskController {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  @Post()
  async create() {
    throw new HttpException("Forbid", HttpStatus.FORBIDDEN);
  }
}
