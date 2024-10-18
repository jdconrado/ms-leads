import { OffsetPagination, LeadFilter } from '@domain/models';

export class SearchLeadsQuery {
  constructor(
    public filter: LeadFilter,
    public pagination?: OffsetPagination,
  ) {}
}
