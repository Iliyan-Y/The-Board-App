import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/Gateways/Task/entity";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { Repository } from "typeorm";

export class TaskRepository implements TaskGateway {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  create(model: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}
