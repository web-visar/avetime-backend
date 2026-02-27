import { Entity, PrimaryColumn } from 'typeorm';

@Entity('t_roles')
export class Role {
  @PrimaryColumn('varchar', { length: 100 })
  name: string;
}
