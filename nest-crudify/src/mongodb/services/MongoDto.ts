import {CommonDto, DtoFactory} from '../../commons/services/CommonDto'

export class MongoDto extends CommonDto<string>{

  constructor(type: string, relationshipNames?: Array<string> ) {
    super(type, relationshipNames);
  }
}

export interface MongoDtoFactory<Entity, Dto extends MongoDto> extends DtoFactory<Entity, string, Dto>{
  create(e: Entity): Dto
}
