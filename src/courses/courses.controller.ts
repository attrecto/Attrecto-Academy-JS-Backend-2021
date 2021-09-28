import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/courses.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {

    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        console.log(typeof id);
        const course = this.coursesService.getOne(id);

        return course;
    }

    @Get()
    getAll() {
        return this.coursesService.getAll();
    }

    @Post()
    create(@Body() data: CourseDto) {
        return this.coursesService.create(data);
    }

    @Put(':id')
    modify(@Param('id', ParseIntPipe) id: number, @Body() data: CourseDto) {
        return this.coursesService.modify(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        this.coursesService.delete(id);
    }
}
