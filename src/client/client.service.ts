import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { LoggerServiceImpl } from "src/logger/logger.service";

const parseCurrency = (value: string): number => {
  const numberValue = value.replace(/[^\d.-]/g, "");
  return parseFloat(numberValue);
};

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private readonly logger: LoggerServiceImpl
  ) {}

  async create(client: Client): Promise<any> {
    this.logger;
    try {
      client.salary = parseCurrency(client.salary.toString());
      client.companyValue = parseCurrency(client.companyValue.toString());

      this.logger.log(`Criando novo cliente: ${client.name}`);

      const createdClient = await this.clientRepository.save(client);

      this.logger.log(`Cliente criado com sucesso: ${createdClient.name}`);

      return {
        message: "Usuário criado com sucesso",
        client: createdClient,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar cliente: ${error.message}`, error.stack);
      throw new Error("Erro ao criar usuário: " + error.message);
    }
  }

  async findAll(): Promise<Client[]> {
    this.logger.log("Buscando todos os clientes...");
    const clients = await this.clientRepository.find();
    this.logger.log(`Número de clientes encontrados: ${clients.length}`);
    return clients;
  }

  async findFavorites(): Promise<Client[]> {
    this.logger.log("Buscando favoritos...");
    const favoriteClients = await this.clientRepository.find({
      where: { selected: true },
    });
    this.logger.log(
      `Número de favoritos encontrados: ${favoriteClients.length}`
    );
    return favoriteClients;
  }

  async update(id: string, client: Partial<Client>): Promise<any> {
    this.logger.log(`Atualizando cliente com id ${id}...`);
    const existingClient = await this.clientRepository.findOne({
      where: { id },
    });

    if (!existingClient) {
      this.logger.warn(`Cliente com id ${id} não encontrado para atualização.`);
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    if (client.salary) client.salary = parseCurrency(client.salary.toString());
    if (client.companyValue)
      client.companyValue = parseCurrency(client.companyValue.toString());

    await this.clientRepository.update(id, client);
    const updatedClient = await this.clientRepository.findOne({
      where: { id },
    });

    this.logger.log(`Cliente com id ${id} atualizado com sucesso.`);

    return {
      message: "Usuário alterado com sucesso",
      client: updatedClient,
    };
  }

  async remove(id: string): Promise<any> {
    this.logger.log(`Removendo cliente com id ${id}...`);
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      this.logger.warn(`Cliente com id ${id} não encontrado para exclusão.`);
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.clientRepository.delete(id);

    this.logger.log(`Cliente com id ${id} excluído com sucesso.`);

    return {
      message: "Usuário excluído com sucesso",
    };
  }

  async toggleFavorite(id: string): Promise<any> {
    this.logger.log(
      `Atualizando status de favorito para cliente com id ${id}...`
    );
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      this.logger.warn(
        `Cliente com id ${id} não encontrado para atualizar status de favorito.`
      );
      return {
        message: "Cliente não encontrado",
      };
    }

    client.selected = !client.selected;
    const updatedClient = await this.clientRepository.save(client);

    this.logger.log(
      `Status de favorito do cliente com id ${id} atualizado para ${client.selected ? "favorito" : "não favorito"}.`
    );

    return {
      message: "Favorito atualizado com sucesso",
      client: updatedClient,
    };
  }
}
