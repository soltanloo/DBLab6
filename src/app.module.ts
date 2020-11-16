import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import UserEntity from './db/entity/user.entity';
import TagEntity from './db/entity/tag.entity';
import CategoryEntity from './db/entity/category.entity';
import TodoEntity from './db/entity/todo.entity';
import TodoItemEntity from './db/entity/todo-item.entity';

@Module({
  imports: [
    HelloModule,
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity,
      TagEntity,
      CategoryEntity,
      TodoEntity,
      TodoItemEntity,
    ]),
    TypeOrmModule.forRoot(),
    AuthModule,
    TodoModule,
    CategoryModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
