import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "src/API/Task/controller";
import { CreateTaskService } from "src/Domain/Task/services/create";
import { TaskRepository } from "src/Gateways.DB/Task/repository";
import { Task } from "src/Gateways/Task/entity";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { TaskProfile } from "./mapper.profile";

@Module({
  controllers: [TaskController],
  providers: [
    TaskProfile,
    CreateTaskService,
    { provide: TaskGateway, useClass: TaskRepository },
  ],
})
export class TaskModule {}
