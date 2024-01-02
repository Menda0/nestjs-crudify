import {MongoDto, MongoDtoFactory} from 'nest-crudify';
import {Todo} from '../database/Todo.schema';

type TodoProperties = {
  id?: string
  name?: string
  description?: string
  createdAt?: number
  updateAt?: number
}

export class TodoDto extends MongoDto{
  name?: string
  description?: string
  createdAt?: number
  updateAt?: number

  constructor({id, name, description, createdAt, updateAt}: TodoProperties) {
    super("todo");
    this.id = id
    this.name = name;
    this.description = description
    this.createdAt = createdAt
    this.updateAt = updateAt
  }
}

export class TodoDtoFactory implements MongoDtoFactory<Todo, TodoDto>{
  create(e: Todo): TodoDto {
    return new TodoDto({
      id: String(e._id),
      name: e.name,
      description: e.description,
      createdAt : e.createdAt,
      updateAt: e.updatedAt
    })
  }
}
