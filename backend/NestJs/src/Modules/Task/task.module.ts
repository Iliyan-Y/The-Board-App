import { Module } from "@nestjs/common";
import { TaskController } from "src/API/Task/controller";

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [],
})
export class TaskModule {}
