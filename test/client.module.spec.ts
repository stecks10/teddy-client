import { Test, TestingModule } from "@nestjs/testing";
import { LoggerModule } from "src/logger/logger.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientController } from "src/client/client.controller";
import { Client } from "src/client/client.entity";
import { ClientService } from "src/client/client.service";

describe("ClientModule", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useClass: Repository,
        },
      ],
      controllers: [ClientController],
    }).compile();
  });

  it("deve ser definido", () => {
    expect(module).toBeDefined();
  });

  it("deve incluir o ClientService como provider", () => {
    const clientService = module.get<ClientService>(ClientService);
    expect(clientService).toBeDefined();
  });

  it("deve incluir o ClientController como controller", () => {
    const clientController = module.get<ClientController>(ClientController);
    expect(clientController).toBeDefined();
  });
});
