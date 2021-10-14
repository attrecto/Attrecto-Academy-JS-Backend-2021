import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { UpdateUserDto } from '../../users/dto/user.dto';

export class CourseDto {
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  url: string;

  @Type(() => UpdateUserDto)
  @ValidateNested({ each: true })
  @IsOptional()
  author: UpdateUserDto;

  @Type(() => UpdateUserDto)
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  students: UpdateUserDto[];
}

export class AssignCourseDto {
  @IsNumber()
  id: number;
}
