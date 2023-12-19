import { ValidationPipe } from "@nestjs/common";
import { TaskController } from "src/API/Task/controller";
import { CreateTaskService } from "src/Domain/Task/services/create";
import { ListService } from "src/Domain/Task/services/list";
import { UpdateTaskService } from "src/Domain/Task/services/update";
import { TaskRepository } from "src/Gateways.DB/Task/repository";
import { Board } from "src/Gateways/Board/entity";
import { BoardColumn } from "src/Gateways/BoardColumn/entity";
import { Task } from "src/Gateways/Task/entity";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { TaskProfile } from "src/Modules/Task/mapper.profile";
import { createTestApi } from "test/helpers/api";

const entities = [Board, BoardColumn, Task];
const controllers = [TaskController];
const providers = [
  TaskProfile,
  ListService,
  UpdateTaskService,
  CreateTaskService,
  { provide: TaskGateway, useClass: TaskRepository },
];

export async function createDefaultTestingModule() {
  const moduleFixture = await createTestApi(entities, controllers, providers)
    .compile()
    .catch((err) => {
      console.error(err);
      throw err;
    });
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  return app;
}

export async function mockDbModule(gateway: any, mockGateway: any) {
  const moduleFixture = await createTestApi(entities, controllers, providers)
    .overrideProvider(gateway)
    .useValue(mockGateway)
    .compile()
    .catch((err) => {
      console.error(err);
      throw err;
    });
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  return app;
}
