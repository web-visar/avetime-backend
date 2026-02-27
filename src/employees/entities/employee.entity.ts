import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Business } from '../../businesses/entities/business.entity';
import { EmployeeBreak } from '../../employee-breaks/entities/employee-break.entity';
import { EmployeeSchedule } from '../../employee-schedules/entities/employee-schedule.entity';
import { Service } from '../../services/entities/service.entity';
import { EmployeePhoto } from 'src/employee-photos/entities/employee-photo.entity';

@Entity('t_employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  businessId: string;

  @ManyToOne(() => Business, (business) => business.employees, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Service, (service) => service.employees)
  @JoinTable({
    name: 't_employee_services',
    joinColumn: { name: 'employeeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'serviceId', referencedColumnName: 'id' },
  })
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.employee)
  appointments: Appointment[];

  @OneToMany(() => EmployeeSchedule, (schedule) => schedule.employee)
  schedules: EmployeeSchedule[];

  @OneToMany(() => EmployeeBreak, (breakTime) => breakTime.employee)
  breaks: EmployeeBreak[];

  @Column({ type: 'uuid', nullable: true })
  photoId: string;

  @OneToOne(() => EmployeePhoto, (photo) => photo.employee, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'photoId', referencedColumnName: 'id' })
  photo: EmployeePhoto;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
