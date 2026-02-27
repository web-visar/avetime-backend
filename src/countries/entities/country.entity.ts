import { City } from 'src/cities/entities/city.entity';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
