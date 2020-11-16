import { Injectable } from '@nestjs/common';
import CategoryEntity from '../db/entity/category.entity';
import CreateCategoryDto from '../dto/create-category.dto';

@Injectable()
export default class CategoryService {
  async insert(categoryDetails: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryEntity: CategoryEntity = CategoryEntity.create();
    const { title } = categoryDetails;

    categoryEntity.title = title;
    await CategoryEntity.save(categoryEntity);
    return categoryEntity;
  }
  async getAll(): Promise<CategoryEntity[]> {
    return await CategoryEntity.find();
  }
}
