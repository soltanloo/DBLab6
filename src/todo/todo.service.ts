import UserEntity from '../db/entity/user.entity';
import CreateTodoDto from '../dto/create-todo.dto';
import TodoEntity from '../db/entity/todo.entity';
import UpdateTodoDto from '../dto/update-todo.dto';
import TagEntity from '../db/entity/tag.entity';
import CategoryEntity from '../db/entity/category.entity';
import TodoItemEntity from '../db/entity/todo-item.entity';
import { UnauthorizedException } from '@nestjs/common';

export class TodoService {
  async insert(todoDetails: CreateTodoDto, userId): Promise<TodoEntity> {
    const { title, description, categoryId, type, items, tags } = todoDetails;
    const todo = new TodoEntity();
    todo.title = title;
    todo.items = [];
    if (type === 'List') {
      for (let i = 0; i < items.length; i++) {
        const item = new TodoItemEntity();
        const { title } = items[i];
        item.title = title;
        todo.items.push(await item.save());
      }
    }
    if (type === 'Text') {
      todo.description = description;
    }
    todo.type = type;
    todo.user = await UserEntity.findOneOrFail(userId);
    todo.category = await CategoryEntity.findOneOrFail(categoryId);
    todo.tags = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = await TagEntity.findOneOrFail(tags[i]);
      todo.tags.push(tag);
    }

    await todo.save();
    return todo;
  }

  async getAll(userId): Promise<TodoEntity[]> {
    const user = await UserEntity.findOneOrFail(userId, {
      relations: ['todos'],
    });
    return TodoEntity.find({ where: { user } });
  }

  async get(userId, todoId): Promise<TodoEntity> {
    const todo = await TodoEntity.findOneOrFail(todoId, {
      relations: ['user', 'tags', 'category', 'items'],
    });
    if (todo.user.id === userId) {
      return todo;
    } else {
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  async delete(todoId: number, userId: number): Promise<TodoEntity> {
    const todo = await TodoEntity.findOneOrFail(todoId, {
      relations: ['user', 'tags', 'category', 'items'],
    });
    if (userId === todo.user.id) {
      return TodoEntity.remove(todo);
    } else {
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  async deleteItem(id, itemId, userId): Promise<TodoItemEntity> {
    const todo = await TodoEntity.findOneOrFail(id, {
      relations: ['user', 'tags', 'category', 'items'],
    });
    const todoItem = await TodoItemEntity.findOneOrFail(itemId);
    if (userId === todo.user.id) {
      return TodoItemEntity.remove(todoItem);
    } else {
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  async update(
    todoId: number,
    todo: UpdateTodoDto,
    userId: number,
  ): Promise<TodoEntity> {
    const originalTodo = await TodoEntity.findOneOrFail(todoId, {
      relations: ['user', 'tags', 'category', 'items'],
    });
    if (originalTodo.user.id === userId) {
      if (todo.tags) {
        originalTodo.tags = [];
        for (let i = 0; i < todo.tags.length; i++) {
          const tag = await TagEntity.findOneOrFail(todo.tags[i]);
          originalTodo.tags.push(tag);
        }
      }
      if (todo.categoryId) {
        originalTodo.category = await CategoryEntity.findOneOrFail(
          todo.categoryId,
        );
      }
      if (todo.type) {
        originalTodo.type = todo.type;
      }
      if (todo.type === 'List') {
        if (todo.items) {
          for (let i = 0; i < originalTodo.items.length; i++) {
            const oldItem = await TodoItemEntity.findOneOrFail(
              originalTodo.items[i].id,
            );
            await TodoItemEntity.remove(oldItem);
          }
          originalTodo.items = [];
          for (let i = 0; i < todo.items.length; i++) {
            const newItem = new TodoItemEntity();
            newItem.title = todo.items[i].title;
            originalTodo.items.push(await newItem.save());
          }
        }
      }
      if (todo.type === 'Text') {
        if (todo.description) {
          originalTodo.description = todo.description;
        }
      }
      if (todo.title) {
        originalTodo.title = todo.title;
      }
      return originalTodo.save();
    } else {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
