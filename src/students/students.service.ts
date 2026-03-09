import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentDto } from './update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepo: Repository<Student>,
  ) {}

  // GET all students
  async findAll(): Promise<Student[]> {
    return this.studentsRepo.find({ order: { createdAt: 'DESC' } });
  }

  // GET one student by id
  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  // POST create student
  async create(dto: CreateStudentDto): Promise<Student> {
    const existing = await this.studentsRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('A student with this email already exists');
    }
    const student = this.studentsRepo.create(dto);
    return this.studentsRepo.save(student);
  }

  // PATCH update student
  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    if (dto.email && dto.email !== student.email) {
      const existing = await this.studentsRepo.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        throw new ConflictException('A student with this email already exists');
      }
    }

    Object.assign(student, dto);
    return this.studentsRepo.save(student);
  }

  // DELETE student
  async remove(id: number): Promise<{ message: string }> {
    const student = await this.findOne(id);
    await this.studentsRepo.remove(student);
    return { message: `Student "${student.name}" deleted successfully` };
  }
}
