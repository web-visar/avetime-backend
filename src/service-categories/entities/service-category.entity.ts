import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { TranslationEntry } from 'src/core/interfaces';

@Entity('t_service_categories')
export class ServiceCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  code: string; // Unique identifier (e.g., 'haircut', 'coloring')

  @Column({ type: 'varchar', length: 100 })
  name: string; // Translated name

  @Column({ type: 'jsonb', nullable: true })
  translations: TranslationEntry | null; // Optional translations for the name

  @Column({ type: 'text', nullable: true })
  description: string; // Translated description

  @Column({ type: 'jsonb', nullable: true })
  descriptionTranslations: TranslationEntry | null; // Optional translations for the description

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
