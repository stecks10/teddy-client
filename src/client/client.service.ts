import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./client.entity";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async create(client: Client): Promise<any> {
    try {
      const createdClient = await this.clientRepository.save(client);
      return {
        message: "Usuário criado com sucesso",
        client: createdClient,
      };
    } catch (error) {
      throw new Error("Erro ao criar usuário: " + error.message);
    }
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findFavorites(): Promise<Client[]> {
    return await this.clientRepository.find({ where: { isFavorite: true } });
  }

  async update(id: string, client: Partial<Client>): Promise<any> {
    const existingClient = await this.clientRepository.findOne({
      where: { id },
    });

    if (!existingClient) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.clientRepository.update(id, client);
    const updatedClient = await this.clientRepository.findOne({
      where: { id },
    });

    return {
      message: "Usuário alterado com sucesso",
      client: updatedClient,
    };
  }

  async remove(id: string): Promise<any> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.clientRepository.delete(id);

    return {
      message: "Usuário excluído com sucesso",
    };
  }

  async toggleFavorite(id: string): Promise<any> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      return {
        message: "Cliente não encontrado",
      };
    }

    client.isFavorite = !client.isFavorite;
    const updatedClient = await this.clientRepository.save(client);

    return {
      message: "Favorito atualizado com sucesso",
      client: updatedClient,
    };
  }
}
