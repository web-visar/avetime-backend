import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';

@Entity('t_timezones')
@Index(['tzCode', 'lang'], { unique: true })
@Index(['countryCode', 'lang'])
export class Timezone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  tzCode: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 5 })
  @Index()
  lang: string;

  @Column({ type: 'varchar', length: 2 })
  @Index()
  countryCode: string;

  @ManyToOne(() => Country, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn([
    { name: 'countryCode', referencedColumnName: 'code' },
    { name: 'lang', referencedColumnName: 'lang' },
  ])
  country: Country;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
