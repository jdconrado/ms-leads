import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLeadCommand } from '../../commands';
import { Lead } from '@domain/models';
import { LeadService } from '@services/lead.service';
import { Logger } from '@nestjs/common';
import { LeadStatusCd } from '@domain/enums';

@CommandHandler(CreateLeadCommand)
export class CreateLeadCommandHandler
  implements ICommandHandler<CreateLeadCommand>
{
  private readonly logger = new Logger(CreateLeadCommandHandler.name);
  constructor(private readonly leadService: LeadService) {}
  async execute(command: CreateLeadCommand): Promise<Lead> {
    this.logger.debug('execute command');
    command.lead.statusCd = LeadStatusCd.NEW;
    const lead = await this.leadService.create(command.lead);
    this.logger.debug('lead created: {lead}', { lead });

    return lead;
  }
}
