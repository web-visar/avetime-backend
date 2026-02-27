import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { User } from '../../users/entities/user.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Service } from '../../services/entities/service.entity';
import { OpeningHour } from '../../opening-hours/entities/opening-hour.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { BusinessImage } from 'src/business-images/entities/business-image.entity';

@Entity('t_businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  ownerId: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ type: 'uuid' })
  cityGroupId: string;

  @ManyToOne(() => City, { onDelete: 'RESTRICT', createForeignKeyConstraints: false })
  @JoinColumn([{ name: 'cityGroupId', referencedColumnName: 'cityGroupId' }])
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

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
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
