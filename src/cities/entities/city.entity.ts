import { TranslationEntry } from 'src/core/interfaces';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Business } from '../../businesses/entities/business.entity';
import { Country } from '../../countries/entities/country.entity';

@Entity('t_cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  translations: TranslationEntry | null;

  @Column({ type: 'varchar', length: 2 })
  @Index()
  countryCode: string;

  @ManyToOne(() => Country, (country) => country.cities, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'countryCode', referencedColumnName: 'code' }])
  country: Country;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Business, (business) => business.city)
  businesses: Business[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
