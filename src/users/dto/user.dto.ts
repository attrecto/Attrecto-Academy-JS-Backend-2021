import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AssignCourseDto } from '../../courses/dto/courses.dto';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @Type(() => AssignCourseDto)
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  courses: AssignCourseDto[];
}
