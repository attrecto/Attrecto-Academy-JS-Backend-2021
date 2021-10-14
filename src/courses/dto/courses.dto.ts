import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
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
  @IsInt()
  @IsPositive()
  id: number;
}
