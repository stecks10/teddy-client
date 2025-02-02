import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";
import { ClientService } from "./client.service";
import { Client } from "./client.entity";
import { ClientDto } from "../dto/client.dto";
import { LoggerServiceImpl } from "src/logger/logger.service";

@ApiTags("clients")
@Controller("clients")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly logger: LoggerServiceImpl
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar um novo cliente" })
  @ApiBody({ type: ClientDto })
  @ApiResponse({ status: 201, description: "Cliente criado com sucesso." })
  @ApiResponse({ status: 400, description: "Dados inválidos." })
  async create(@Body() client: Client) {
    this.logger.log(`Criando novo cliente: ${client.name}`);
    return await this.clientService.create(client);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os clientes" })
  @ApiResponse({
    status: 200,
    description: "Lista de clientes retornada com sucesso.",
  })
  async findAll() {
    this.logger.log("Buscando todos os clientes...");
    return await this.clientService.findAll();
  }

  @Get("favorites")
  @ApiOperation({ summary: "Listar clientes favoritos" })
  @ApiResponse({
    status: 200,
    description: "Lista de clientes favoritos retornada com sucesso.",
  })
  findFavorites() {
    return this.clientService.findFavorites();
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar um cliente existente" })
  @ApiParam({ name: "id", description: "ID do cliente a ser atualizado" })
  @ApiBody({ type: ClientDto, description: "Dados atualizados do cliente" })
  @ApiResponse({ status: 200, description: "Cliente atualizado com sucesso." })
  @ApiResponse({ status: 404, description: "Cliente não encontrado." })
  update(@Param("id") id: string, @Body() client: Partial<Client>) {
    return this.clientService.update(id, client);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletar um cliente" })
  @ApiParam({ name: "id", description: "ID do cliente a ser deletado" })
  @ApiResponse({ status: 200, description: "Cliente deletado com sucesso." })
  @ApiResponse({ status: 404, description: "Cliente não encontrado." })
  remove(@Param("id") id: string) {
    return this.clientService.remove(id);
  }

  @Put("favorite/:id")
  @ApiOperation({ summary: "Alternar o status de favorito de um cliente" })
  @ApiParam({ name: "id", description: "ID do cliente" })
  @ApiResponse({
    status: 200,
    description: "Cliente marcado/desmarcado como favorito com sucesso.",
  })
  @ApiResponse({ status: 404, description: "Cliente não encontrado." })
  toggleFavorite(@Param("id") id: string) {
    return this.clientService.toggleFavorite(id);
  }
}
