import { Role } from 'src/common/role-enum';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Index({ unique: true })
  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  @Column({ name: 'role', type: 'varchar', nullable: true })
  role: string;

  @OneToMany(() => CourseEntity, (course) => course.author)
  course: CourseEntity[];

  @ManyToMany(() => CourseEntity)
  @JoinTable({
    name: 'course_users',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'course_id' }],
  })
  courses: CourseEntity[];
}
