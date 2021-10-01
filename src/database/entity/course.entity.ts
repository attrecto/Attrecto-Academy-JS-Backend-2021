import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'author', type: 'varchar' })
  author: string;

  @Column({ name: 'url', type: 'varchar' })
  url: string;
}
