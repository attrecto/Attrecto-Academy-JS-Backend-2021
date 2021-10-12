import { Column, Entity, Index, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToOne(() => CourseEntity, {cascade: true})
  course: CourseEntity

  @ManyToMany(() => CourseEntity)
  @JoinTable({
      name: 'course_users',
      joinColumns: [{ name: 'user_id' }],
      inverseJoinColumns: [{ name: 'course_id' }],
  })
  courses: CourseEntity[];

}
