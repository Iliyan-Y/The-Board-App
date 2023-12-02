import { BoardController } from '../../src/API/Board/controller';
import { Board } from '../../src/Gateways/Board/entity';
//const httpMocks = require("node-mocks-http");
import * as httpMocks from 'node-mocks-http';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { BoardService } from '../../src/Domain/Board/service';

describe('board controller', () => {
  let controller: BoardController;
  // todo create request to match controller expectations
  const mockRequest = httpMocks.createRequest();
  mockRequest.body = {
    boardName: 'Test-123',
  };
  // const entity: Board = {
  //   name: 'Test',
  // };

  const mockService = {
    create: jest.fn().mockImplementation((model: Board) => {
      return {
        id: 1,
        ...model,
      };
    }),
  };

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,

        // { provide: UserService, useValue: mockUserService },
      ],
    })
      .overrideProvider(BoardService)
      .useValue(mockService)
      .compile();

    controller = moduleRef.get<BoardController>(BoardController);
  });

  it('should create', () => {
    expect(controller.create(mockRequest.body)).toEqual({
      id: expect.any(Number),
    });
  });
});
