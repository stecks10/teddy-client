import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("decimal")
  salary: number;

  @Column("decimal")
  companyValue: number;

  @Column({ default: false })
  isFavorite: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
