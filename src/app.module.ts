import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_CONNECTION_STRING'),
        useUnifiedTopology: true,
        synchronize: true,
        useNewUrlParser: true,
        entities: [Lesson, Student],
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule,
    StudentModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
