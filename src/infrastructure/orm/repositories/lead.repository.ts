import { LeadEntity } from '@infra/orm/entities';
import { ILeadRepository } from '@infra/orm/primitives';
import { BaseRepository } from './base.repository';
import { Lead } from '@domain/models';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, FilterOperators } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ILeadFilter } from '@domain/primitives';
import { ContactTypeCd } from '@domain/enums';

export class LeadRepository
  extends BaseRepository<LeadEntity, Lead>
  implements ILeadRepository
{
  constructor(
    @InjectRepository(LeadEntity) repository: MongoRepository<LeadEntity>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(repository, LeadEntity, Lead, mapper);
  }

  override filterToQueryObject(
    filter: ILeadFilter,
  ): Partial<LeadEntity> | FilterOperators<LeadEntity> {
    const queryObject: Partial<LeadEntity> | FilterOperators<LeadEntity> = {};

    if (filter.companyId) {
      queryObject.companyId = filter.companyId;
    }

    if (filter.email) {
      queryObject.contactData = {
        $elemMatch: {
          value: filter.email,
          typeCd: ContactTypeCd.EMAIL,
        },
      };
    }

    if (filter.phone) {
      queryObject.contactData = {
        $elemMatch: {
          value: filter.phone,
          typeCd: ContactTypeCd.PHONE,
        },
      };
    }

    if (filter.assignedTo) {
      queryObject.assignedTo = {
        $regex: new RegExp(filter.assignedTo, 'i'),
      };
    }

    if (filter.fullName) {
      queryObject.fullName = {
        $regex: new RegExp(filter.fullName, 'i'),
      };
    }

    if (filter.jobTitle) {
      queryObject.jobTitle = {
        $regex: new RegExp(filter.jobTitle, 'i'),
      };
    }

    if (filter.organizationName) {
      queryObject.organizationName = {
        $regex: new RegExp(filter.organizationName, 'i'),
      };
    }

    if (filter.representsOrganization !== undefined) {
      queryObject.representsOrganization = filter.representsOrganization;
    }

    if (filter.sourceCd && filter.sourceCd.length > 0) {
      queryObject.sourceCd = {
        $in: filter.sourceCd,
      };
    }

    if (filter.statusCd && filter.statusCd.length > 0) {
      queryObject.statusCd = {
        $in: filter.statusCd,
      };
    }

    return queryObject;
  }
}
