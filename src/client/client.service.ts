import { Injectable, NotFoundException, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { LoggerServiceImpl } from "src/logger/logger.service";
import { parseBRLCurrency } from "src/utils/parse-currency.util";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly logger: LoggerServiceImpl
  ) {}

  async create(client: Client): Promise<{ message: string; client: Client }> {
    try {
      client.salary = parseBRLCurrency(client.salary.toString());
      client.companyValue = parseBRLCurrency(client.companyValue.toString());

      this.logger.log(
        `Criando cliente: ${client.name}, salário: ${client.salary}, valor da empresa: ${client.companyValue}`
      );

      const createdClient = await this.clientRepository.save(client);

      this.logger.log(`Cliente criado com sucesso: ${createdClient.name}`);

      return {
        message: "Usuário criado com sucesso",
        client: createdClient,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
      throw new HttpException(
        {
          statusCode: 500,
          message: "Erro ao criar usuário",
          error: error.message,
        },
        500
      );
    }
  }

  async findAll(): Promise<Client[]> {
    this.logger.log("Buscando todos os clientes...");
    const clients = await this.clientRepository.find();
    this.logger.log(`Número de clientes encontrados: ${clients.length}`);
    return clients;
  }

  async findFavorites(): Promise<Client[]> {
    this.logger.log("Buscando clientes favoritos...");
    const favorites = await this.clientRepository.find({
      where: { selected: true },
    });
    this.logger.log(
      `Número de clientes favoritos encontrados: ${favorites.length}`
    );
    return favorites;
  }

  async update(
    id: string,
    client: Partial<Client>
  ): Promise<{ message: string; client: Client }> {
    this.logger.log(`Atualizando cliente com id ${id}...`);

    const existingClient = await this.clientRepository.findOne({
      where: { id },
    });

    if (!existingClient) {
      this.logger.warn(`Cliente com id ${id} não encontrado.`);
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    if (client.salary)
      client.salary = parseBRLCurrency(client.salary.toString());
    if (client.companyValue)
      client.companyValue = parseBRLCurrency(client.companyValue.toString());

    await this.clientRepository.update(id, client);
    const updatedClient = await this.clientRepository.findOne({
      where: { id },
    });

    if (!updatedClient) {
      this.logger.warn(`Cliente com id ${id} não encontrado após atualização.`);
      throw new NotFoundException(
        `Client with id ${id} not found after update`
      );
    }

    this.logger.log(`Cliente com id ${id} atualizado com sucesso.`);

    return {
      message: "Usuário alterado com sucesso",
      client: updatedClient,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    this.logger.log(`Removendo cliente com id ${id}...`);

    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      this.logger.warn(`Cliente com id ${id} não encontrado.`);
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.clientRepository.delete(id);

    this.logger.log(`Cliente com id ${id} excluído com sucesso.`);

    return {
      message: "Usuário excluído com sucesso",
    };
  }

  async toggleFavorite(
    id: string
  ): Promise<{ message: string; client: Client }> {
    this.logger.log(`Trocando status de favorito para cliente com id ${id}...`);

    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      this.logger.warn(`Cliente com id ${id} não encontrado.`);
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    client.selected = !client.selected;
    const updatedClient = await this.clientRepository.save(client);

    this.logger.log(
      `Status de favorito atualizado para ${client.selected ? "favorito" : "não favorito"}`
    );

    return {
      message: "Favorito atualizado com sucesso",
      client: updatedClient,
    };
  }
}
