import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchLeadsQuery } from '../../queries';
import { ISearchMetadata } from '@domain/primitives';
import { Lead } from '@domain/models';
import { Logger } from '@nestjs/common';
import { LeadService } from '@services/lead.service';

@QueryHandler(SearchLeadsQuery)
export class SearchLeadsQueryHandler
  implements IQueryHandler<SearchLeadsQuery>
{
  private readonly logger = new Logger(SearchLeadsQueryHandler.name);
  constructor(private readonly leadService: LeadService) {}
  execute(query: SearchLeadsQuery): Promise<[Lead[], ISearchMetadata]> {
    this.logger.debug('execute query');
    return this.leadService.search(query.filter, {
      pagination: query.pagination,
    });
  }
}
