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
import { ApiBearerAuth } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CourseDto } from './dto/courses.dto';
import { Id } from '../common/id.decorator';
import { TokenGuard } from '../auth/guards/token.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../common/role-enum';

@ApiBearerAuth()
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async getOne(@Id() id: number) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  @Get()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async getAll() {
    return this.coursesService.getAll();
  }

  @Post()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async create(@Body() data: CourseDto) {
    return this.coursesService.create(data);
  }

  @Put(':id')
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async modify(@Id() id: number, @Body() data: CourseDto) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    return this.coursesService.modify(id, data);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async delete(@Id() id: number) {
    const course = await this.coursesService.getOne(id);

    if (!course) {
      throw new NotFoundException();
    }

    await this.coursesService.delete(id);
  }
}
