import { BusinessImage } from 'src/business-images/entities/business-image.entity';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { OpeningHour } from '../../opening-hours/entities/opening-hour.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('t_businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  link: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 5, nullable: true, default: 'fr' })
  @Index()
  lang: string;

  @Column({ type: 'uuid' })
  cityGroupId: string;

  @ManyToOne(() => City, { onDelete: 'RESTRICT', createForeignKeyConstraints: false })
  @JoinColumn([
    { name: 'cityGroupId', referencedColumnName: 'cityGroupId' },
    {
      name: 'lang',
      referencedColumnName: 'lang',
    },
  ])
  city: City;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  website: string;

  @OneToMany(() => BusinessImage, (businessImage) => businessImage.business)
  images: BusinessImage[];

  @Column({ type: 'decimal', precision: 12, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 12, scale: 8, nullable: true })
  longitude: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Employee, (employee) => employee.business)
  employees: Employee[];

  @OneToMany(() => Service, (service) => service.business)
  services: Service[];

  @OneToMany(() => OpeningHour, (openingHour) => openingHour.business)
  openingHours: OpeningHour[];

  @OneToMany(() => Membership, (membership) => membership.business)
  memberships: Membership[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
