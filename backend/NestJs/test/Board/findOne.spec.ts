import { createDefaultTestingModule, mockDbModule } from "./setup";
import * as request from "supertest";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { Board } from "src/Gateways/Board/entity";
import { BoardColumn } from "src/Gateways/BoardColumn/entity";
import { v4 as uuidv4 } from "uuid";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";

const createMocks = () => {
  const boardId = "6c3d3013-4b13-46d1-881d-db5b1436f3e8";
  const mockColumn = new BoardColumn();
  const mockBoard = new Board();

  mockColumn.id = uuidv4();
  mockColumn.name = "Test Me";

  mockBoard.id = boardId;
  mockBoard.name = "TEST";
  mockBoard.columns = [mockColumn];

  return { mockBoard, mockColumn };
};

describe("board find one", () => {
  const { mockBoard, mockColumn } = createMocks();
  const url = `/${mockBoard.id}`;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("It call findOne gateway once", async () => {
    const findOne = jest.fn().mockImplementation((id: string) => mockBoard);
    const mockService = { findOne };
    const { app } = await mockDbModule(BoardGateway, mockService);
    await app.init();
    await request(app.getHttpServer()).get(url);
    expect(findOne).toHaveBeenCalledTimes(1);
  });

  it("When no data in DB return 404 not found", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    const expected = await request(app.getHttpServer()).get(url);

    expect(expected.status).toBe(404);
  });

  it("When data in DB return 200 ok", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();
    const boardGateway = app.get<BoardGateway>(BoardGateway);
    await boardGateway.create(mockBoard);

    const expected = await request(app.getHttpServer()).get(url);

    expect(expected.status).toBe(200);
  });

  it("When board but no columns return board object", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();
    const boardGateway = app.get<BoardGateway>(BoardGateway);
    await boardGateway.create(mockBoard);

    const expected = await request(app.getHttpServer()).get(url);

    expect(expected.body).toMatchObject({
      id: mockBoard.id,
      name: mockBoard.name,
      columns: [],
    });
  });

  it("When in DB return board and columns", async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();
    const boardGateway = app.get<BoardGateway>(BoardGateway);
    const columnGateway = app.get<BoardColumnGateway>(BoardColumnGateway);
    const boardResult = await boardGateway.create(mockBoard);
    mockColumn.board = boardResult;
    await columnGateway.create(mockColumn);

    const expected = await request(app.getHttpServer()).get(url);

    expect(expected.body).toMatchObject({
      id: mockBoard.id,
      name: mockBoard.name,
      columns: [{ id: mockColumn.id, name: mockColumn.name }],
    });
  });
});
