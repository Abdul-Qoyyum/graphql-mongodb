import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInputType {
  @IsUUID('4')
  @Field((id) => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field((id) => [ID])
  studentIds: string[];
}
