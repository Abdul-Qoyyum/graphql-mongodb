import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @MinLength(4, { message: 'Minimum length 4 is required' })
  firstName: string;

  @Field()
  @MinLength(4, { message: 'Minimum length of 4 is required' })
  lastName: string;
}
