import { TaskGateway } from "src/Gateways/Task/gateway";
import { createDefaultTestingModule, mockDbModule } from "./setup";
import * as request from "supertest";
import { Task } from "src/Gateways/Task/entity";
import { v4 as uuidv4 } from "uuid";

describe("Task, Create", () => {
  const url = "/task";

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Return bad request when no body", async () => {
    const app = await createDefaultTestingModule();
    await app.init();

    const expected = await request(app.getHttpServer()).post(url);

    expect(expected.status).toBe(400);
  });

  it("Return bad request when no columnId in the body", async () => {
    const app = await createDefaultTestingModule();
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      name: "test",
    });
    const expected = {
      error: "Bad Request",
      message: ["columnId should not be empty"],
      statusCode: 400,
    };
    expect(result.body).toMatchObject(expected);
  });

  it("Return bad request when no name in the body", async () => {
    const app = await createDefaultTestingModule();
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      columnId: "some-uuid",
    });
    const expected = {
      error: "Bad Request",
      message: ["name should not be empty"],
      statusCode: 400,
    };
    expect(result.body).toMatchObject(expected);
  });

  it("will call create record repository", async () => {
    const create = jest.fn().mockImplementation((model: Task) => {
      return {
        id: "some-other-uuid",
        ...model,
      };
    });
    const mockService = { create };
    const app = await mockDbModule(TaskGateway, mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send({
      name: "test",
      columnId: "12-some-uuid",
    });

    expect(create).toHaveBeenCalledTimes(1);
  });

  it("Return 201 created", async () => {
    const create = jest.fn().mockImplementation((model: Task) => {
      return {
        id: "some-other-uuid",
        ...model,
      };
    });
    const mockService = { create };
    const app = await mockDbModule(TaskGateway, mockService);
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      name: "test",
      columnId: "12-some-uuid",
    });

    expect(result.status).toBe(201);
  });

  it("will create record with name", async () => {
    const create = jest.fn().mockImplementation((model: Task) => {
      return {
        id: "some-other-uuid",
        ...model,
      };
    });
    const mockService = { create };
    const app = await mockDbModule(TaskGateway, mockService);
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      name: "test",
      columnId: "12-some-uuid",
    });

    expect(result.body).toMatchObject({
      id: "some-other-uuid",
      name: "test",
      columnId: "12-some-uuid",
    });
  });

  it("will create record with description", async () => {
    const create = jest.fn().mockImplementation((model: Task) => {
      return {
        id: "some-other-uuid",
        ...model,
      };
    });
    const mockService = { create };
    const app = await mockDbModule(TaskGateway, mockService);
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      name: "test",
      description: "test - description",
      columnId: "12-some-uuid",
    });

    expect(result.body).toMatchObject({
      id: "some-other-uuid",
      name: "test",
      description: "test - description",
      columnId: "12-some-uuid",
    });
  });

  it("will throw error if invalid uuid for columnId", async () => {
    const app = await createDefaultTestingModule();
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      name: "test",
      description: "test - description",
      columnId: "12-some-uuid",
    });

    expect(result.body).toMatchObject({
      message: "Internal server error",
      statusCode: 500,
    });
  });

  it("will throw error if columnId not in the db", async () => {
    const app = await createDefaultTestingModule();
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send({
      name: "test",
      description: "test - description",
      columnId: uuidv4(),
    });

    expect(result.body).toMatchObject({
      message: "Internal server error",
      statusCode: 500,
    });
  });
});
