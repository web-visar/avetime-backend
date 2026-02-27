import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_employee_photos')
export class EmployeePhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Employee, (employee) => employee.photo)
  employee: Employee;
}
