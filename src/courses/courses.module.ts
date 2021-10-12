import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CourseEntity } from '../database/entity/course.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([CourseEntity])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
