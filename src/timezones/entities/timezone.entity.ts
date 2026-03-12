import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import type { TranslationEntry } from 'src/core/interfaces';
import { Expose } from 'class-transformer';

@Entity('t_timezones')
export class Timezone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  tzCode: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'jsonb' })
  translations: TranslationEntry;

  @Column({ type: 'varchar', length: 2 })
  @Index()
  countryCode: string;

  @ManyToOne(() => Country, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'countryCode', referencedColumnName: 'code' }])
  country: Country;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  displayName(lang: string): string {
    return this.translations[lang] || this.name;
  }
}
