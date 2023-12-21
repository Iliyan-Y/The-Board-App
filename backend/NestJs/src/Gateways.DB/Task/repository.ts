import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/Gateways/Board/entity";
import { Task } from "src/Gateways/Task/entity";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { Repository } from "typeorm";

export class TaskRepository implements TaskGateway {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async create(model: Task): Promise<Task> {
    const task = this.repository.create(model);
    await this.repository.save(task);
    const column = await this.repository.query(
      `SELECT * FROM board_column WHERE id = '${task.column.id}'`,
    );
    task.column.board = { id: column[0].boardId } as Board;
    return task;
  }

  async listColTask(columnId: string): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { column: { id: columnId } },
      relations: {
        column: true,
      },
    });
    return tasks;
  }

  async update(model: Task): Promise<Task> {
    const task = await this.repository.save(model);
    return task;
  }
}
