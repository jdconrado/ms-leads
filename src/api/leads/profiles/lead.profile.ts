import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import {
  Lead,
  BaseModel,
  LeadFilter,
  OffsetPagination,
  ContactInfo,
} from '@domain/models';
import {
  LeadDto,
  CreateLeadDto,
  EntityDto,
  SearchLeadRequestDto,
  ContactInfoDto,
  PatchLeadDto,
} from '@api/leads/dtos';

import { mapDateToISOString, mapISOStringToDate } from '@api/commons/utils';
import { OffsetPaginationDto } from '@api/commons/dtos';

@Injectable()
export class LeadProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      this.dtoToModel(mapper);
      this.modelToDto(mapper);
    };
  }

  dtoToModel(mapper: Mapper) {
    createMap(
      mapper,
      EntityDto,
      BaseModel,
      mapISOStringToDate('createdAt'),
      mapISOStringToDate('updatedAt'),
    );
    createMap(mapper, OffsetPaginationDto, OffsetPagination);
    createMap(
      mapper,
      ContactInfoDto,
      ContactInfo,
      mapISOStringToDate('createdAt'),
    );
    createMap(mapper, LeadDto, Lead, mapISOStringToDate('assignedAt'));
    createMap(mapper, CreateLeadDto, Lead);
    createMap(mapper, PatchLeadDto, Lead);
    createMap(mapper, SearchLeadRequestDto, LeadFilter);
  }

  modelToDto(mapper: Mapper) {
    createMap(
      mapper,
      BaseModel,
      EntityDto,
      mapDateToISOString('createdAt'),
      mapDateToISOString('updatedAt'),
    );
    createMap(
      mapper,
      ContactInfo,
      ContactInfoDto,
      mapDateToISOString('createdAt'),
    );
    createMap(mapper, Lead, LeadDto, mapDateToISOString('assignedAt'));
    createMap(mapper, LeadFilter, SearchLeadRequestDto);
  }
}
