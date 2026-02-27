import { Business } from 'src/businesses/entities/business.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_business_images')
export class BusinessImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Business, (business) => business.images, { onDelete: 'CASCADE' })
  business: Business;

  @Column({ type: 'varchar', length: 255 })
  url: string;
}
