import { Test, TestingModule } from "@nestjs/testing";
import { ClientController } from "../src/client/client.controller";
import { ClientService } from "../src/client/client.service";
import { LoggerServiceImpl } from "../src/logger/logger.service";
import { Client } from "../src/client/client.entity";

describe("ClientController", () => {
  let controller: ClientController;
  let service: ClientService;
  let logger: LoggerServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({
              message: "Usuário criado com sucesso",
              client: {},
            }),
          },
        },
        {
          provide: LoggerServiceImpl,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
    logger = module.get<LoggerServiceImpl>(LoggerServiceImpl);
  });

  it("deve ser definido", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("deve retornar uma lista de clientes", async () => {
      const clients: Client[] = [
        {
          id: "1",
          name: "John",
          salary: 5000,
          companyValue: 10000,
          selected: false,
        },
        {
          id: "2",
          name: "Doe",
          salary: 4000,
          companyValue: 8000,
          selected: true,
        },
      ];

      jest.spyOn(service, "findAll").mockResolvedValue(clients);

      const result = await controller.findAll();

      expect(result).toEqual(clients);

      expect(logger.log).toHaveBeenCalledWith("Buscando todos os clientes...");
    });
  });

  describe("create", () => {
    it("deve criar um cliente", async () => {
      const client = {
        id: "1",
        name: "John",
        salary: 5000,
        companyValue: 10000,
        selected: false,
      };
      jest.spyOn(service, "create").mockResolvedValue({
        message: "Usuário criado com sucesso",
        client,
      });

      const result = await controller.create(client);

      expect(result.message).toBe("Usuário criado com sucesso");
      expect(result.client).toEqual(client);

      expect(logger.log).toHaveBeenCalledWith(
        `Criando novo cliente: ${client.name}`
      );
    });
  });
});
