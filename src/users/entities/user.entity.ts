import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column } from 'typeorm';
import { CrudValidationGroups } from "@nestjsx/crud";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User extends AbstractEntity<User> {
  @ApiProperty()
  @Column() email: string;
}
