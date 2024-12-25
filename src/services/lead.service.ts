import { ILeadService } from '@services/primitives';
import { Injectable, Logger } from '@nestjs/common';
import { ILead, ILeadFilter, ISearchMetadata } from '@domain/primitives';
import { LeadRepository } from '@infra/orm/repositories';

@Injectable()
export class LeadService implements ILeadService {
  private readonly logger = new Logger(LeadService.name);

  constructor(private readonly repository: LeadRepository) {}

  async create(input: ILead): Promise<ILead> {
    this.logger.debug('create({input})', { input });
    const result = await this.repository.create(input);
    this.logger.debug('create: {result}', { result });

    return result;
  }

  delete(id: string): Promise<ILead | null> {
    this.logger.debug('delete({id})', { id });
    return this.repository.delete(id);
  }

  getById(id: string): Promise<ILead | null> {
    this.logger.debug('getById({id})', { id });
    return this.repository.getById(id);
  }

  async search(
    filter: ILeadFilter,
    options?: ISearchMetadata,
  ): Promise<[ILead[], ISearchMetadata]> {
    this.logger.debug('search({filter, pagination, sorting})', {
      filter,
      pagination: options?.pagination,
      sorting: options?.sorting,
    });
    const result = await this.repository.search(filter, options);
    this.logger.debug('search: {count}', { count: result[1].pagination.count });

    return result;
  }

  async replace(id: string, input: ILead): Promise<ILead | null> {
    this.logger.debug('replace({id}, {input})', { id, input });
    const result = await this.repository.replace(id, input);
    this.logger.debug('replace: {result}', { result });

    return result;
  }

  async patch(id: string, input: Partial<ILead>): Promise<ILead | null> {
    this.logger.debug('patch({id}, {input})', { id, input });
    const result = await this.repository.patch(id, input);
    this.logger.debug('patch: {result}', { result });

    return result;
  }
}
