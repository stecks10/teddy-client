import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { Client } from "./client.entity";

@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() client: Client) {
    return this.clientService.create(client);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get("favorites")
  findFavorites() {
    return this.clientService.findFavorites();
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() client: Partial<Client>) {
    // Mudando para string
    return this.clientService.update(id, client);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    // Mudando para string
    return this.clientService.remove(id);
  }

  @Put("favorite/:id")
  toggleFavorite(@Param("id") id: string) {
    // Mudando para string
    return this.clientService.toggleFavorite(id);
  }
}
