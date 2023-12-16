import { Module } from "@nestjs/common";
import { TaskController } from "src/API/Task/controller";
import { CreateTaskService } from "src/Domain/Task/services/create";
import { TaskRepository } from "src/Gateways.DB/Task/repository";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { TaskProfile } from "./mapper.profile";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/Gateways/Task/entity";
import { ListService } from "src/Domain/Task/services/list";
import { UpdateTaskService } from "src/Domain/Task/services/update";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskProfile,
    ListService,
    UpdateTaskService,
    CreateTaskService,
    { provide: TaskGateway, useClass: TaskRepository },
  ],
})
export class TaskModule {}
