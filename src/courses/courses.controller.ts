import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CoursesService } from './courses.service';
import { CourseDto } from './dto/courses.dto';
import { Id } from '../common/id.decorator';
import { TokenGuard } from '../auth/guards/token.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  @UseGuards(TokenGuard)
  async getOne(@Id() id: number) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  @Get()
  @UseGuards(TokenGuard)
  async getAll() {
    return this.coursesService.getAll();
  }

  @Post()
  @UseGuards(TokenGuard)
  async create(@Body() data: CourseDto) {
    return this.coursesService.create(data);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  async modify(@Id() id: number, @Body() data: CourseDto) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    return this.coursesService.modify(id, data);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  async delete(@Id() id: number) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    await this.coursesService.delete(id);
  }
}
