import { Business } from 'src/businesses/entities/business.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_business_logos')
export class BusinessLogo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @OneToOne(() => Business, (business) => business.logo, { onDelete: 'CASCADE' })
  business: Business;
}
