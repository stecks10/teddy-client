import { Test, TestingModule } from "@nestjs/testing";
import { ClientService } from "../src/client/client.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Client } from "../src/client/client.entity";
import { LoggerServiceImpl } from "../src/logger/logger.service";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

describe("ClientService", () => {
  let service: ClientService;
  let repository: Repository<Client>;
  let logger: LoggerServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useClass: Repository,
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

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    logger = module.get<LoggerServiceImpl>(LoggerServiceImpl);
  });

  it("deve ser definido", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("deve retornar uma lista de clientes", async () => {
      const clients: Client[] = [
        {
          id: uuidv4(),
          name: "John",
          salary: 5000,
          companyValue: 10000,
          selected: false,
        },
      ];

      jest.spyOn(repository, "find").mockResolvedValue(clients);

      const result = await service.findAll();

      expect(result).toEqual(clients);
      expect(logger.log).toHaveBeenCalledWith("Buscando todos os clientes...");
    });
  });

  describe("create", () => {
    it("deve criar um cliente", async () => {
      const client: Client = {
        id: uuidv4(),
        name: "John",
        salary: 5000,
        companyValue: 10000,
        selected: false,
      };

      jest.spyOn(repository, "save").mockResolvedValue(client);

      const result = await service.create(client);

      expect(result.client).toEqual(client);
      expect(result.message).toBe("Usuário criado com sucesso");

      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining("Criando cliente")
      );
    });
  });

  describe("remove", () => {
    it("deve excluir um cliente", async () => {
      const clientId = uuidv4();
      const client: Client = {
        id: clientId,
        name: "John",
        salary: 5000,
        companyValue: 10000,
        selected: false,
      };

      jest.spyOn(repository, "findOne").mockResolvedValue(client);
      jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 1, raw: {} });

      const result = await service.remove(clientId);

      expect(result.message).toBe("Usuário excluído com sucesso");
      expect(logger.log).toHaveBeenCalledWith(
        `Removendo cliente com id ${clientId}...`
      );
    });

    it("deve lançar um erro se o cliente não for encontrado", async () => {
      const clientId = uuidv4();
      jest.spyOn(repository, "findOne").mockResolvedValue(null);

      await expect(service.remove(clientId)).rejects.toThrow(
        `Client with id ${clientId} not found`
      );

      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(`Cliente com id ${clientId}`)
      );
    });
  });
});
