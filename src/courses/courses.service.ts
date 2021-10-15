import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourseEntity } from '../database/entity/course.entity';
import { CourseDto } from './dto/courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
  ) {}

  getAll() {
    return this.coursesRepository.find({ relations: ['author', 'students'] });
  }

  getOne(id: number) {
    return this.coursesRepository.findOne(id, {
      relations: ['author', 'students'],
    });
  }

  async create(course: CourseDto) {
    return this.coursesRepository.save(course);
  }

  modify(id: number, course: CourseDto) {
    course.id = id;
    return this.coursesRepository.save(course);
  }

  delete(id: number) {
    this.coursesRepository.delete(id);
  }
}
