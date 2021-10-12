import { Type } from 'class-transformer';
import {IsArray, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { UpdateUserDto } from 'src/users/dto/user.dto';
export class CourseDto {
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @Type(() => UpdateUserDto)
  author: UpdateUserDto;

  @Type(() => UpdateUserDto)
  @IsArray()
  @IsOptional()
  students: UpdateUserDto[];
}

export class AssignCourseDto {
  @IsNumber()
  id: number;
}
