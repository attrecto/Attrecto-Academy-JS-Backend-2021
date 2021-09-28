import { Injectable } from '@nestjs/common';
import { CourseDto } from './dto/courses.dto';

const COURSES = [
    {
        id: 1,
        title: 'Attrecto academy 2021',
        description: 'NEST.JS',
        author: 'Varga Oresztész',
        url: 'https://attrecto.com'
    },
    {
        id: 2,
        title: 'Teszt kurzus 2',
        description: 'Teszt adat 2',
        author: 'Test Author',
        url: 'https://google.com'
    }
];

@Injectable()
export class CoursesRepository {
    private courses = COURSES;

    find() {
        return this.courses;
    }

    findOne(id: number) {
        return this.courses.find(function (course) {
            return course.id === id;
        });
    }

    save(data: CourseDto) {
        const existing = this.findOne(data.id);

        // létezik a rekord, tehát frissítjük az értékét
        if(existing) {
            const index = this.courses.findIndex(function (course){
                return course.id === data.id;
            });

            this.courses[index] = data;

            return data;
        }
        // nem létezik ez az id, tehát be kell szúrnunk a tömbbe
        else {
            data.id = this.courses[this.courses.length - 1].id + 1;
            this.courses.push(data);

            return data;
        }
    }

    delete(id: number) {
        this.courses = this.courses.filter(function (course){
            return course.id !== id;
        });
    }
}