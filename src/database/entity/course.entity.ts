import { type } from 'os';
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  author: UserEntity;

  @Column({ name: 'url', type: 'varchar' })
  url: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({
      name: 'course_users',
      joinColumns: [{ name: 'course_id' }],
      inverseJoinColumns: [{ name: 'user_id' }],
  })
  students: UserEntity[];

}
