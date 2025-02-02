import { ApiProperty } from "@nestjs/swagger";

export class ClientDto {
  @ApiProperty({
    example: "c79952f8-d4b5-4739-9ff0-c0e27baf7f14",
    description: "Identificador único do cliente (UUID)",
  })
  id: string;

  @ApiProperty({
    example: "Cliente 1234",
    description: "Nome do cliente",
  })
  name: string;

  @ApiProperty({
    example: "50000",
    description: "Salário do cliente",
  })
  salary: string;

  @ApiProperty({
    example: "1000000",
    description: "Valor da empresa do cliente",
  })
  companyValue: string;

  @ApiProperty({
    example: true,
    description: "Indica se o cliente está selecionado como favorito",
  })
  selected: boolean;
}
