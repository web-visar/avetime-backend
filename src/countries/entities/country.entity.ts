import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('t_countries')
@Index(['code', 'lang'], { unique: true })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 2 })
  @Index()
  code: string; // ISO 3166-1 alpha-2 code

  @Column({ type: 'varchar', length: 100 })
  name: string; // Translated name

  @Column({ type: 'varchar', length: 5 })
  @Index()
  lang: string; // ISO 639-1 language code (e.g., 'en', 'fr', 'de')

  @Column({ type: 'varchar', length: 100, nullable: true })
  nativeName: string; // Name in native language

  @Column({ type: 'varchar', length: 10, nullable: true })
  phoneCode: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  flag: string; // Flag emoji or code

  @Column({ default: true })
  isActive: boolean;3468

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
