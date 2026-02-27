import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';

@Entity('t_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  fullName: string;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}
