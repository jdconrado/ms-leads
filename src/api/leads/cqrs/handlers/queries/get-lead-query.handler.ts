import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLeadQuery } from '@api/leads/cqrs/queries';
import { LeadService } from '@services/lead.service';
import { Logger, NotFoundException } from '@nestjs/common';

@QueryHandler(GetLeadQuery)
export class GetLeadQueryHandler implements IQueryHandler<GetLeadQuery> {
  private readonly logger = new Logger(GetLeadQueryHandler.name);
  constructor(private readonly leadService: LeadService) {}

  async execute(query: GetLeadQuery) {
    this.logger.debug('execute query');
    const result = await this.leadService.getById(query.id);
    if (!result) {
      throw new NotFoundException(`Lead with id ${query.id} not found`);
    }
    return result;
  }
}
