import { IsString, IsEmail, IsInt, MinLength, Min, Max, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email address' })
  email?: string;

  @IsOptional()
  @IsInt({ message: 'Age must be a number' })
  @Min(1, { message: 'Age must be at least 1' })
  @Max(120, { message: 'Age must be at most 120' })
  age?: number;
}
