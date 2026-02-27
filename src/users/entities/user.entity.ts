import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';
import { Role } from '../../roles/entities/role.entity';

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
