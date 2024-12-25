import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReplaceLeadCommand } from '@api/leads/cqrs/commands/replace-lead.command';
import { Logger, NotFoundException } from '@nestjs/common';
import { LeadService } from '@services/lead.service';
import { ILead } from '@domain/primitives';

@CommandHandler(ReplaceLeadCommand)
export class ReplaceLeadCommandHandler
  implements ICommandHandler<ReplaceLeadCommand>
{
  private readonly logger = new Logger(ReplaceLeadCommandHandler.name);
  constructor(private readonly leadService: LeadService) {}

  async execute(command: ReplaceLeadCommand): Promise<ILead> {
    this.logger.debug('execute command');
    const lead = await this.leadService.replace(command.id, command.lead);
    this.logger.debug('lead replaced: {lead}', { lead });

    if (!lead) {
      throw new NotFoundException(`Lead with id ${command.id} not found`);
    }

    return lead;
  }
}
