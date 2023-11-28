import { BoardController } from 'src/API/Board/controller';
import { Board } from 'src/Gateways/Board/entity';

describe('board controller', () => {
  let controller: BoardController;
  // todo create request to match controller expectations

  const entity: Board = {
    name: 'Test',
  };

  const mockService = {
    create: jest.fn().mockImplementation(() => {
      return {
        id: 1,
        ...product,
      };
    }),
  };
  const mockUserService = {};

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        { provide: UserService, useValue: mockUserService },
        {
          provide: JwtGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = moduleRef.get<ProductController>(ProductController);
  });
});
