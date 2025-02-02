import { ClientDto } from "../src/dto/client.dto";
import { validate } from "class-validator";

describe("ClientDto", () => {
  let clientDto: ClientDto;

  beforeEach(() => {
    clientDto = new ClientDto();
  });

  it("should be defined", () => {
    expect(clientDto).toBeDefined();
  });

  it("should be valid with correct values", async () => {
    clientDto.id = "c79952f8-d4b5-4739-9ff0-c0e27baf7f14";
    clientDto.name = "John Doe";
    clientDto.salary = "50000";
    clientDto.companyValue = "1000000";
    clientDto.selected = true;

    const errors = await validate(clientDto);
    expect(errors.length).toBe(0);
  });

  it("should throw error with invalid values", async () => {
    clientDto.id = "invalid-uuid";
    clientDto.name = "";
    clientDto.salary = "not-a-number";
    clientDto.companyValue = "not-a-number";
    clientDto.selected = false;

    const errors = await validate(clientDto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
