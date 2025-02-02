import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue("Hello World!"),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it("deve ser definido", () => {
    expect(appController).toBeDefined();
  });

  it('deve retornar "Hello World!"', () => {
    const result = appController.getHello();
    expect(result).toBe("Hello World!");
    expect(appService.getHello).toHaveBeenCalled();
  });
});
