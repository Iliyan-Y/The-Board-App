import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/Gateways/Task/entity";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { Repository } from "typeorm";

export class TaskRepository implements TaskGateway {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async create(model: Task): Promise<Task> {
    const task = this.repository.create(model);
    await this.repository.save(task);
    return task;
  }

  async listColTask(columnId: string): Promise<Task[]> {
    const tasks = await this.repository
      .createQueryBuilder()
      .where('"columnId" = :columnId', { columnId })
      .getMany();
    return tasks;
  }
}
