import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ContactInfoEntity, LeadEntity } from '@infra/orm/entities';
import { ContactInfo, Lead } from '@domain/models';
import { extendEntityToModel, extendModelToEntity } from './commons';

@Injectable()
export class LeadEntityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      this.entityToModel(mapper);
      this.modelToEntity(mapper);
    };
  }

  entityToModel(mapper: Mapper) {
    createMap(mapper, ContactInfoEntity, ContactInfo);
    createMap(mapper, LeadEntity, Lead, extendEntityToModel(mapper));
  }

  modelToEntity(mapper: Mapper) {
    createMap(mapper, ContactInfo, ContactInfoEntity);
    createMap(mapper, Lead, LeadEntity, extendModelToEntity(mapper));
  }
}
