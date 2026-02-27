import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Business } from '../../businesses/entities/business.entity';

@Entity('t_cities')
@Index(['name', 'countryCode', 'lang', 'cityGroupId'])
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', length: 2 })
  @Index()
  countryCode: string; // ISO 3166-1 alpha-2 code

  @Column({ type: 'varchar', length: 5, nullable: true })
  @Index()
  lang: string | null; // ISO 639-1 language code

  @Column({ type: 'uuid', nullable: false })
  @Index()
  cityGroupId: string | null; // Groups translations of the same city together

  @ManyToOne(() => Country, (country) => country.cities, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
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
