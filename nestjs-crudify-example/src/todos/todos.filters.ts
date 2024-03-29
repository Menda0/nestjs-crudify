import { Types } from 'mongoose';
import { SearchFilters, TransformToFilter, parseValues } from 'nestjs-crudify';
import {
  FilterLike,
  FilterMatchIn,
  FilterOr,
  parseObjectId,
} from 'nestjs-crudify-mongodb';

export class TodoFilters extends SearchFilters {
  constructor({
    id,
    name,
    description,
    username,
  }: {
    id?: FilterMatchIn<Types.ObjectId[]>;
    name?: FilterLike;
    description?: FilterLike;
    username?: FilterLike;
  }) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.username = username;
  }

  @TransformToFilter<Types.ObjectId[]>(new FilterMatchIn('_id'), (v) =>
    parseValues(v, parseObjectId)
  )
  id?: FilterMatchIn<Types.ObjectId[]>;
  @TransformToFilter<string>(new FilterLike('name'))
  name?: FilterLike;
  @TransformToFilter<string>(new FilterLike('description'))
  description?: FilterLike;
  @TransformToFilter<string>(new FilterLike('user.name'))
  username?: FilterLike;
}

export class TodoSearch extends SearchFilters {
  constructor({ nameOrDescription }: { nameOrDescription?: FilterOr<any> }) {
    super();
    this.nameOrDescription = nameOrDescription;
  }

  @TransformToFilter<any>(new FilterOr('nameOrDescription'), (v) => {
    return [new FilterLike('name', v), new FilterLike('description', v)];
  })
  nameOrDescription?: FilterOr<any>;
}
