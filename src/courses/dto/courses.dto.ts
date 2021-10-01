import { IsString, IsUrl } from 'class-validator';
export class CourseDto {
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsUrl()
  url: string;
}
