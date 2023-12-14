import { Injectable } from "@nestjs/common";
import { Task } from "./entity";

@Injectable()
export abstract class TaskGateway {
  abstract create(model: Task): Promise<Task>;
  abstract listColTask(columnId: string): Promise<Task[]>;
}
