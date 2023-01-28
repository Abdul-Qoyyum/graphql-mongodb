import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';

export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string) {
    return await this.lessonRepository.findOneBy({ id });
  }

  async createLesson(name, startDate, endDate): Promise<Lesson> {
    const lesson = await this.lessonRepository.create({
      id: uuidv4(),
      name,
      startDate,
      endDate,
    });

    return await this.lessonRepository.save(lesson);
  }
}
