import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { NotFoundException } from '@nestjs/common';

export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string) {
    return await this.lessonRepository.findOneBy({ id });
  }

  async getAllLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    if (!lesson) throw new NotFoundException(`Lesson ${lessonId} not found`);
    lesson.students = lesson.students
      ? [...lesson.students, ...studentIds]
      : studentIds;
    return await this.lessonRepository.save(lesson);
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = await this.lessonRepository.create({
      id: uuidv4(),
      ...createLessonInput,
    });

    return await this.lessonRepository.save(lesson);
  }
}
