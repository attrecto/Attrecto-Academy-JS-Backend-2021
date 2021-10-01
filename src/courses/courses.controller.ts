import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';

import { CoursesService } from './courses.service';
import { CourseDto } from './dto/courses.dto';
import { Id } from '../common/id.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  async getOne(@Id() id: number) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  @Get()
  async getAll() {
    return this.coursesService.getAll();
  }

  @Post()
  async create(@Body() data: CourseDto) {
    return this.coursesService.create(data);
  }

  @Put(':id')
  async modify(@Id() id: number, @Body() data: CourseDto) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    return this.coursesService.modify(id, data);
  }

  @Delete(':id')
  async delete(@Id() id: number) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    await this.coursesService.delete(id);
  }
}
