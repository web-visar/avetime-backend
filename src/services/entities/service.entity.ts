import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Business } from '../../businesses/entities/business.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { ServiceCategory } from '../../service-categories/entities/service-category.entity';

@Entity('t_services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  businessId: string;

  @ManyToOne(() => Business, (business) => business.services, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, default: 'other' })
  @Index()
  categoryCode: string; // Reference to ServiceCategory code

  @Column({ type: 'varchar', length: 5, default: 'en' })
  @Index()
  categoryLang: string; // Language for the category reference

  @ManyToOne(() => ServiceCategory, (serviceCategory) => serviceCategory.services, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn([{ name: 'categoryCode', referencedColumnName: 'code' }])
  category: ServiceCategory;

  @Column({ type: 'int' })
  durationMinutes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ length: 3, default: 'EUR' })
  currency: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Employee, (employee) => employee.services)
  employees: Employee[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
