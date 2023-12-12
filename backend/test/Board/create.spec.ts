import { Board } from "../../src/Gateways/Board/entity";
import { CreateCommand } from "../../src/Domain/Board/services/create";
import * as request from "supertest";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { createDefaultTestingModule, mockDbModule } from "./setup";
import { BoardGateway } from "src/Gateways/Board/gateway";

describe("board controller create", () => {
  const url = "/";
  const body = {
    boardName: "Test-123",
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Example controller test", async () => {
    const module = await createDefaultTestingModule();
    const command = new CreateCommand("From_the_test");
    const expected = await module.controller.create(body, command);
    expect(expected.name).toEqual("From_the_test");
  });

  // Prefer to run  e2e as it will also test the body mapping profile
  it("When no body then status code 500", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();
    return request(app.getHttpServer()).post(url).expect(400);
  });

  it("When record with the same name return conflict", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    const repo = app.get<Repository<Board>>(getRepositoryToken(Board));
    const board = repo.create({ name: body.boardName });
    await repo.save(board);
    return request(app.getHttpServer()).post(url).send(body).expect(409);
  });

  it("When record created, return board object with id", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    const result = await request(app.getHttpServer()).post(url).send(body);

    expect(result.status).toBe(201);
    expect(typeof result.body.id).toBe("string");
  });

  it("Should check for exist once", async () => {
    const exist = jest.fn().mockImplementation((model: Board) => true);
    const mockService = { exist };

    const { app } = await mockDbModule(BoardGateway, mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send(body);

    expect(exist).toHaveBeenCalledTimes(1);
  });

  it("If name exist will NOT try to create record", async () => {
    const exist = jest.fn().mockImplementation((model: Board) => true);
    const create = jest.fn().mockImplementation((model: Board) => {
      return {
        id: "some-uuid",
        ...model,
      };
    });
    const mockService = { exist, create };
    const { app } = await mockDbModule(BoardGateway, mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send(body);

    expect(create).not.toHaveBeenCalled();
  });

  it("If name not exist will try to create record", async () => {
    const create = jest.fn().mockImplementation((model: Board) => {
      return {
        id: "some-uuid",
        ...model,
      };
    });
    const mockService = {
      exist: jest.fn().mockImplementation((model: Board) => false),
      create,
    };
    const { app } = await mockDbModule(BoardGateway, mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send(body);

    expect(create).toHaveBeenCalledTimes(1);
  });
});
