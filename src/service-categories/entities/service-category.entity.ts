import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity('t_service_categories')
@Index(['code', 'lang'], { unique: true })
export class ServiceCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  code: string; // Unique identifier (e.g., 'haircut', 'coloring')

  @Column({ type: 'varchar', length: 100 })
  name: string; // Translated name

  @Column({ type: 'varchar', length: 5 })
  @Index()
  lang: string; // ISO 639-1 language code (e.g., 'en', 'fr', 'de')

  @Column({ type: 'text', nullable: true })
  description: string; // Translated description

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string; // Icon identifier or emoji

  @Column({ type: 'int', default: 0 })
  sortOrder: number; // Display order

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
