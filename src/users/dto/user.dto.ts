import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../common/role-enum';
import { AssignCourseDto } from '../../courses/dto/courses.dto';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @Type(() => AssignCourseDto)
  @IsArray()
  @IsOptional()
  courses: AssignCourseDto[];
}
