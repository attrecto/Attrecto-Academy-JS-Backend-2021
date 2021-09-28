import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CourseDto } from './dto/courses.dto';

@Injectable()
export class CoursesService {

    constructor(private readonly coursesRepository: CoursesRepository) {

    }

    getAll() {
        return this.coursesRepository.find();
    }

    getOne(id: number) {
        return this.coursesRepository.findOne(id);
    }

    create(course: CourseDto) {
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
