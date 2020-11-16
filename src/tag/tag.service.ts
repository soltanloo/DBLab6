import { Injectable } from '@nestjs/common';
import CreateTagDto from '../dto/create-tag.dto';
import TagEntity from '../db/entity/tag.entity';

@Injectable()
export default class TagService {
  async insert(tagDetails: CreateTagDto): Promise<TagEntity> {
    const tagEntity: TagEntity = TagEntity.create();
    const { title } = tagDetails;

    tagEntity.title = title;
    await TagEntity.save(tagEntity);
    return tagEntity;
  }
  async getAll(): Promise<TagEntity[]> {
    return await TagEntity.find();
  }
}
