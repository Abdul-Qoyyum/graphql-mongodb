import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterQuery, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return await this.studentRepository.findOneBy({ id });
  }

  async createStudent(createStudentInput: CreateStudentInput) {
    const student = await this.studentRepository.create({
      id: uuidv4(),
      ...createStudentInput,
    });
    return await this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: FilterQuery<string[]>) {
    return await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });
  }
}
