import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Business } from '../../businesses/entities/business.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('t_memberships')
@Unique(['userId', 'businessId']) // A user can only have one membership per business
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  role: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role', referencedColumnName: 'name' })
  roleEntity: Role;

  @Column({ type: 'uuid', nullable: true })
  businessId: string;

  @ManyToOne(() => Business, (business) => business.memberships, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  invitedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
