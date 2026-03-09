import { IsString, IsEmail, IsInt, MinLength, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsInt({ message: 'Age must be a number' })
  @Min(1, { message: 'Age must be at least 1' })
  @Max(120, { message: 'Age must be at most 120' })
  age: number;
}
